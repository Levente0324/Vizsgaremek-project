import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Bejelentkezés' })
  @ApiResponse({
    status: 200,
    description: 'Sikeres bejelentkezés',
    type: Object,
  })
  @ApiResponse({ status: 401, description: 'Hibás email vagy jelszó' })
  async login(@Body() loginData: LoginDto) {
    try {
      return await this.authService.login(loginData);
    } catch {
      throw new UnauthorizedException('Hibás email vagy jelszó');
    }
  }

  @Delete('logout')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Kijelentkezés' })
  @ApiResponse({ status: 200, description: 'Sikeres kijelentkezés' })
  async logout(@Request() req) {
    const token = req.headers['authorization'].split(' ')[1];
    return await this.authService.logout(token);
  }
}
