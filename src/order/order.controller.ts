import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new order' })
    create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
        const userId = req.user.userId;
        return this.orderService.create({ ...createOrderDto, customerId: userId });
    }

    @Get()
    @ApiOperation({ summary: 'Get all orders' })
    findAll() {
        return this.orderService.findAll();
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Update order status (Admin only)' })
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.orderService.updateStatus(+id, status);
    }
}
