import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  //Email
  @ApiProperty({
    example: 'changeduser@gmail.com',
    description: 'New email of the user',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  //Password
  @ApiProperty({
    example: 'Password321!',
    description: 'New password of the user',
  })
  @IsString()
  @IsOptional()
  password?: string;
}
