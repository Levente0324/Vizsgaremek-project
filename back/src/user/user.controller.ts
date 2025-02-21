import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Felhasználó létrehozása' })
  @ApiResponse({ status: 201, description: 'Felhasználó sikeresen létrehozva' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználók listázása' })
  @ApiResponse({ status: 200, description: 'Felhasználók listája' })
  findAll(@Request() req) {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Felhasználó lekérése' })
  @ApiResponse({ status: 200, description: 'Felhasználó adatai' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Felhasználó módosítása' })
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen módosítva' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Felhasználó törlése' })
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen törölve' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
