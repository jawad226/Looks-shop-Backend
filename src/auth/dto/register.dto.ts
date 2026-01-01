import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class RegisterDto {

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '03190412345',
    description: 'Phone of the user',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  @IsString()
  @MinLength(6)
  password: string;
}
