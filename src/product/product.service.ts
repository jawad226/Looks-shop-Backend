import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const category = await this.categoryRepository.findOne({ where: { id: createProductDto.categoryId } });
        if (!category) throw new NotFoundException('Category not found');

        const product = this.productRepository.create({
            ...createProductDto,
            category,
        });
        return await this.productRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ['category'] });
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: number, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return await this.productRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }

    async count(): Promise<number> {
        return await this.productRepository.count();
    }
}
