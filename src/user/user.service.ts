import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(CreateData: RegisterDto): Promise<User> { // Changed parameter type to RegisterDto to match existing import, assuming CreateUserDto was a placeholder or typo in the instruction snippet.
    const user = this.userRepository.create(CreateData);
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
}
