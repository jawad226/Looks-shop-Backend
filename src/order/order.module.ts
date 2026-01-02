import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderItem, User, Product])],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService],
})
export class OrderModule { }
