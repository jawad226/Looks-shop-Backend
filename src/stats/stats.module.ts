import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [ProductModule, OrderModule, UserModule],
    controllers: [StatsController],
})
export class StatsModule { }
