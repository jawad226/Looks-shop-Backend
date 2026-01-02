import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const user = await this.userRepository.findOne({ where: { id: createOrderDto.customerId } });
        if (!user) throw new NotFoundException('User not found');

        // Generate order number
        const orderCount = await this.orderRepository.count();
        const orderNumber = `#${3217 + orderCount}`;

        // Create order items and calculate total
        let totalAmount = 0;
        const orderItems: OrderItem[] = [];

        for (const itemDto of createOrderDto.items) {
            const product = await this.productRepository.findOne({ where: { id: itemDto.productId } });
            if (!product) throw new NotFoundException(`Product with ID ${itemDto.productId} not found`);

            if (product.stock < itemDto.quantity) {
                throw new NotFoundException(`Product ${product.name} is out of stock (Requested: ${itemDto.quantity}, Available: ${product.stock})`);
            }

            // Update inventory
            product.stock -= itemDto.quantity;
            product.sold = (product.sold || 0) + itemDto.quantity;
            await this.productRepository.save(product);

            const orderItem = this.orderItemRepository.create({
                product,
                quantity: itemDto.quantity,
                price: product.price,
            });

            orderItems.push(orderItem);
            totalAmount += product.price * itemDto.quantity;
        }

        // Create order
        const order = this.orderRepository.create({
            orderNumber,
            customer: user,
            items: orderItems,
            totalAmount,
            paymentMethod: createOrderDto.paymentMethod || 'COD',
            shippingAddress: createOrderDto.shippingAddress,
            status: createOrderDto.paymentMethod === 'COD' ? 'Pending' : 'Paid',
        });

        return await this.orderRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: ['customer', 'items', 'items.product'] });
    }

    async updateStatus(id: number, status: string): Promise<Order> {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product']
        });
        if (!order) throw new NotFoundException('Order not found');

        // Business Rule: Can't revert final statuses (Soft check currently)
        // if (order.status === 'Delivered' || order.status === 'Cancelled') ...

        // Stock Restoration Logic
        if (status === 'Cancelled' && order.status !== 'Cancelled') {
            for (const item of order.items) {
                if (item.product) {
                    item.product.stock += item.quantity;
                    item.product.sold = Math.max(0, (item.product.sold || 0) - item.quantity);
                    await this.productRepository.save(item.product);
                }
            }
        }

        order.status = status;
        return await this.orderRepository.save(order);
    }

    async count(): Promise<number> {
        return await this.orderRepository.count();
    }

    async sumTotalSales(): Promise<number> {
        const result = await this.orderRepository
            .createQueryBuilder('order')
            .select('SUM(order.totalAmount)', 'sum')
            .getRawOne();
        return result.sum || 0;
    }
}
