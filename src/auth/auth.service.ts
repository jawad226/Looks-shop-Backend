import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../user/mailer.service';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwt: JwtService,
        private readonly mailerService: MailerService,
    ) { }

    async register(dto: RegisterDto) {
        const exists = await this.userService.findByEmail(dto.email);
        if (exists) throw new ConflictException('Email already registered');

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userService.create({
            ...dto,
            password: hashedPassword,
        });

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwt.signAsync(payload);

        return {
            message: 'Register successfully',
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async login(dto: loginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid)
            throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwt.signAsync(payload);

        return {
            message: 'Logged in successfully',
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    async forgotPassword(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException('Email not found');

        const token = this.jwt.sign(
            { email: user.email },
            {
                secret: 'RESET_SECRET', // Secret for reset tokens
                expiresIn: '15m',
            },
        );


        //  Send email using the dedicated service method
        await this.mailerService.sendResetPasswordMail(user.email, token);

        return { message: 'Reset link sent to your email' };
    }

    async resetPassword(token: string, newPassword: string) {
        try {
            const payload = this.jwt.verify(token, { secret: 'RESET_SECRET' }) as any;
            const user = await this.userService.findByEmail(payload.email);
            if (!user) throw new NotFoundException('User not found');

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this.userService.updatePassword(user.id, hashedPassword);

            return { message: 'Password reset successful' };
        } catch (e) {
            console.error('JWT Verification Error:', e.message);
            throw new BadRequestException('Invalid or expired token');
        }
    }

    async promoteToAdmin(email: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new NotFoundException('User not found');

        await this.userService.updateRole(user.id, UserRole.ADMIN);
        return { message: `${email} has been promoted to ADMIN successfully. Please LOG OUT and LOG IN again on the website.` };
    }
}
