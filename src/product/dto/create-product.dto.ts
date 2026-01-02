import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Mobile Phone Case' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({ example: 700 })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ example: 850, required: false })
    @IsNumber()
    @IsOptional()
    originalPrice?: number;

    @ApiProperty({ example: 150 })
    @IsNumber()
    @IsOptional()
    stock?: number;

    @ApiProperty({ example: 'Spigen' })
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiProperty({ example: 'image-url.jpg' })
    @IsString()
    @IsOptional()
    image?: string;
}
