import { IsEmail, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  //Email
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email of the user',
    required: true,
  })
  @IsEmail()
  email: string;

  //Password
  @ApiProperty({
    example: 'Password123!',
    description: 'Password of the user',
  })
  @IsStrongPassword()
  password: string;

  //Is admin
  @ApiProperty({
    example: 'true',
    description: 'User is admin',
  })
  isAdmin: boolean;
}
