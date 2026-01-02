import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './entities/user.entity';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) { }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  findAll(): Promise<User[]> {
    return this.UserService.findAll();
  }

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
