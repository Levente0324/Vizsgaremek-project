import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Request,
  Headers,
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

@ApiTags('Users endpoint')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó létrehozása (admin)' })
  @ApiResponse({
    status: 201,
    description: 'Felhasználó sikeresen létrehozva',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  create(
    @Headers('Authorization') token: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(token, createUserDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználók listázása (admin)' })
  @ApiResponse({ status: 200, description: 'Felhasználók listája' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findAll(@Headers('Authorization') token: string) {
    return this.usersService.findAll(token);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó lekérése (admin)' })
  @ApiResponse({
    status: 200,
    description: 'Felhasználó adatai',
    type: CreateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findOne(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.usersService.findOne(+id, token);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó módosítása' })
  @ApiResponse({
    status: 200,
    description: 'Felhasználó sikeresen módosítva',
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') token: string,
  ) {
    return this.usersService.update(+id, updateUserDto, token);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Felhasználó törlése (admin)' })
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  remove(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.usersService.remove(+id, token);
  }
}
