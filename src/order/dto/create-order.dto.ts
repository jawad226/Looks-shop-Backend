import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

class OrderItemDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    productId: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({ type: [OrderItemDto] })
    @IsArray()
    @IsNotEmpty()
    items: OrderItemDto[];

    @ApiProperty({ example: 'COD' })
    @IsString()
    @IsOptional()
    paymentMethod?: string;

    @ApiProperty({ example: { street: '123 Main St', city: 'Karachi', postalCode: '75500' } })
    @IsOptional()
    shippingAddress?: object;

    @IsOptional()
    customerId?: number;
}
