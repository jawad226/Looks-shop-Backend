import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('users')
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({ example: '03190412345' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'hashedpassword123' })
  @Column()
  password: string;

  @ApiProperty({ example: 0 })
  @Column({ default: 0 })
  totalSpent: number;

  @ApiProperty({ example: '2025-01-15' })
  @Column({ default: () => 'CURRENT_DATE' })
  joinDate: string;

  @ApiProperty({ example: 'Active' })
  @Column({ default: 'Active' })
  status: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
}
