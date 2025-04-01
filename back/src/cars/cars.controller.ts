import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Headers,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Cars endpoint')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Jármű létrehozása' })
  @ApiResponse({
    status: 201,
    description: 'Jármű sikeresen létrehozva',
    type: CreateCarDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  create(
    @Body() createCarDto: CreateCarDto,
    @Headers('Authorization') token: string,
  ) {
    return this.carsService.create(createCarDto, token);
  }

  @Get()
  @ApiOperation({ summary: 'Járművek listázása' })
  @ApiResponse({ status: 200, description: 'Járművek listája' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Jármű lekérése' })
  @ApiResponse({ status: 200, description: 'Jármű adatai', type: CreateCarDto })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Jármű módosítása' })
  @ApiResponse({
    status: 200,
    description: 'Jármű sikeresen módosítva',
    type: UpdateCarDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @Headers('Authorization') token: string,
  ) {
    return this.carsService.update(+id, updateCarDto, token);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Jármű törlése' })
  @ApiResponse({ status: 200, description: 'Jármű sikeresen törölve' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  remove(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.carsService.remove(+id, token);
  }
}
