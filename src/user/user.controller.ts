import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto/register.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) { }


  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @Post()
  create(@Body() CreateUserDto: RegisterDto): Promise<User> {
    return this.UserService.create(CreateUserDto);
  }
}
