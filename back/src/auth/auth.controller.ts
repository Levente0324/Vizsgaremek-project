import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Delete,
  UseGuards,
  Request,
  Headers,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerData: { email: string; password: string }) {
    return await this.authService.register(registerData);
  }

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

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  async getProfile(@Headers('authorization') token: string) {
    return await this.authService.validateToken(token);
  }

  @Delete('logout')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Kijelentkezés' })
  @ApiResponse({ status: 200, description: 'Sikeres kijelentkezés' })
  async logout(@Headers('authorization') token: string) {
    try {
      await this.authService.logout(token);
      return { message: 'Successfully logged out' };
    } catch (error) {
      throw new UnauthorizedException('Failed to logout');
    }
  }
}
