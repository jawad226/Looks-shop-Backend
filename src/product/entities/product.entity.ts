import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';

@Entity('products')
export class Product {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Mobile Phone Case' })
    @Column()
    name: string;

    @ManyToOne(() => Category, (category) => category.products)
    @ApiProperty({ type: () => Category })
    category: Category;

    @ApiProperty({ example: 700 })
    @Column('float')
    price: number;

    @ApiProperty({ example: 850, required: false })
    @Column('float', { nullable: true })
    originalPrice: number;

    @ApiProperty({ example: 150 })
    @Column({ default: 0 })
    stock: number;

    @ApiProperty({ example: 520 })
    @Column({ default: 0 })
    sold: number;

    @ApiProperty({ example: 'image-url.jpg' })
    @Column({ nullable: true })
    image: string;

    @ApiProperty({ example: 'Spigen' })
    @Column({ nullable: true })
    brand: string;

    @ApiProperty({ example: 4.6 })
    @Column('float', { default: 0 })
    rating: number;
}
