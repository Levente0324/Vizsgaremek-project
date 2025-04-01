import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email of the user',
    required: true,
  })
  email: string;

  @ApiProperty({
    example: 'Password123!',
    description: 'Password of the user',
    required: true,
  })
  password: string;
}
