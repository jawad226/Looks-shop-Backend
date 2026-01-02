import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new category' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiOperation({ summary: 'Delete category' })
    remove(@Param('id') id: string) {
        return this.categoryService.remove(+id);
    }
}
