import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';

@Entity('categories')
export class Category {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Earbuds' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: 'earbuds' })
    @Column({ unique: true })
    slug: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
