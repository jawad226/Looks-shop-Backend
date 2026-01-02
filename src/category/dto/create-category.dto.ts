import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Earbuds' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'earbuds' })
    @IsString()
    @IsNotEmpty()
    slug: string;
}
