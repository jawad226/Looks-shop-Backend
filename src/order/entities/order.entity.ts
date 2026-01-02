import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: '#3217' })
    @Column({ unique: true })
    orderNumber: string;

    @ManyToOne(() => User)
    @ApiProperty({ type: () => User })
    customer: User;

    @OneToMany(() => OrderItem, item => item.order, { cascade: true, eager: true })
    @ApiProperty({ type: () => [OrderItem] })
    items: OrderItem[];

    @ApiProperty({ example: 'Pending' })
    @Column({ default: 'Pending' })
    status: string;

    @ApiProperty({ example: 5000 })
    @Column('float', { default: 0 })
    totalAmount: number;

    @ApiProperty({ example: 'COD' })
    @Column({ default: 'COD' })
    paymentMethod: string;

    @ApiProperty({ example: { street: '123 Main St', city: 'Karachi', postalCode: '75500' } })
    @Column({ type: 'jsonb', nullable: true })
    shippingAddress: object;

    @CreateDateColumn()
    @ApiProperty({ example: '2025-12-09' })
    date: Date;
}
