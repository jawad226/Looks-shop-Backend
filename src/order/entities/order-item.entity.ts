import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity('order_items')
export class OrderItem {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    order: Order;

    @ManyToOne(() => Product)
    @ApiProperty({ type: () => Product })
    product: Product;

    @ApiProperty({ example: 2 })
    @Column()
    quantity: number;

    @ApiProperty({ example: 1500 })
    @Column('float')
    price: number;
}
