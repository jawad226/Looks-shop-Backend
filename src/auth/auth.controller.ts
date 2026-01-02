import { Body, Controller, HttpCode, HttpStatus, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from 'src/user/dto/create-forget.dto';
import { ResetPasswordDto } from 'src/user/dto/create-rest.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { errorSchema } from 'src/utils/error-schema';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // ========================================== Register ==========================================

  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully registered.',
    type: RegisterDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid Credentials.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  signUp(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // ========================================== Login ==========================================

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged in.',
    type: loginDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid Credentials.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: loginDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: loginDto) {
    return this.authService.login(dto);
  }

  // ========================================== Forgot Password ==========================================

  @ApiOperation({ summary: 'Forgot password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully forgot.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid Credentials.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: ForgotPasswordDto })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  // ========================================== Reset Password ==========================================

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password has been successfully reset.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
    schema: errorSchema(HttpStatus.BAD_REQUEST),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid Credentials.',
    schema: errorSchema(HttpStatus.NOT_FOUND),
  })
  @ApiBody({ type: ResetPasswordDto })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.newPassword);
  }

  // ========================================== PROMOTE TO ADMIN (Temp for testing) ==========================================
  @Get('make-admin')
  @Post('make-admin')
  @ApiOperation({ summary: 'Promote a user to admin (Testing only)' })
  async makeAdmin(@Query('email') email: string, @Body('email') bodyEmail: string) {
    const targetEmail = email || bodyEmail;
    return this.authService.promoteToAdmin(targetEmail);
  }
}
