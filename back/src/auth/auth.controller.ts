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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ApiTags('Auth endpoint')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Regisztráció' })
  @ApiResponse({
    status: 200,
    description: 'Sikeres regisztráció',
    type: LoginDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  async register(@Body() registerData: { email: string; password: string }) {
    return await this.authService.register(registerData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Bejelentkezés' })
  @ApiResponse({ status: 200, description: 'Sikeres bejelentkezés' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  async login(@Body() loginData: LoginDto) {
    try {
      return await this.authService.login(loginData);
    } catch {
      throw new UnauthorizedException('Hibás email vagy jelszó');
    }
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Bejelenkezett user adatai' })
  @ApiResponse({ status: 200, description: 'User adatai', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  async getProfile(@Headers('Authorization') token: string) {
    return await this.authService.validateToken(token);
  }

  @Delete('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Kijelentkezés' })
  @ApiResponse({ status: 200, description: 'Sikeres kijelentkezés' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  async logout(@Headers('Authorization') token: string) {
    try {
      await this.authService.logout(token);
      return { message: 'Successfully logged out' };
    } catch (error) {
      throw new UnauthorizedException('Failed to logout');
    }
  }
}
