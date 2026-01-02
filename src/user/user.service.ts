import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(CreateData: RegisterDto): Promise<User> {
    const userCount = await this.userRepository.count();
    const user = this.userRepository.create({
      ...CreateData,
      role: userCount === 0 ? UserRole.ADMIN : UserRole.USER,
    });
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        password: true,
        role: true,
      },
    });
    return user || undefined;
  }
  async updatePassword(userId: number, newPassword: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    user.password = newPassword;
    return this.userRepository.save(user);
  }

  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  async updateRole(userId: number, role: UserRole) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    user.role = role;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'name', 'email', 'phone', 'totalSpent', 'joinDate', 'status', 'role'],
    });
  }
}
