import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService implements OnModuleInit {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async onModuleInit() {
        // Cleanup old slug
        await this.categoryRepository.delete({ slug: 'ShopAll' });

        const defaultCategories = [
            { name: 'Shop All', slug: 'Shop-all' },
            { name: 'Earbuds', slug: 'Earbuds' },
            { name: 'Adaptor', slug: 'Adaptor' },
            { name: 'Headphones', slug: 'Headphones' },
            { name: 'Mobile Phone Case', slug: 'MobilePhoneCase' },
            { name: 'Sale', slug: 'Sale' },
        ];

        for (const cat of defaultCategories) {
            const exists = await this.categoryRepository.findOne({ where: { slug: cat.slug } });
            if (!exists) {
                await this.categoryRepository.save(this.categoryRepository.create(cat));
            }
        }
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { id } });
    }

    async findBySlug(slug: string): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { slug } });
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
