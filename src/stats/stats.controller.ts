import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@ApiTags('stats')
@Controller('stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class StatsController {
    constructor(
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly userService: UserService,
    ) { }

    @Get('dashboard')
    @ApiOperation({ summary: 'Get dashboard statistics' })
    async getDashboardStats() {
        const totalSales = await this.orderService.sumTotalSales();
        const ordersCount = await this.orderService.count();
        const customersCount = await this.userService.count();
        const productsCount = await this.productService.count();

        return {
            totalSales: `Rs ${totalSales.toLocaleString()}`,
            orders: ordersCount,
            customers: customersCount,
            products: productsCount,
        };
    }
}
