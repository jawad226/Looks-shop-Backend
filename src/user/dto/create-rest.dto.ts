import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;


  @ApiProperty({
    example: 'password',
    description: 'New password of the user',
  })
  @MinLength(6)
  @IsString()
  newPassword: string;
}


