import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({ summary: 'Jármű létrehozása' })
  @ApiResponse({ status: 201, description: 'Jármű sikeresen létrehozva.' })
  @ApiResponse({ status: 400, description: 'Hibás bemenet' })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Járművek listázása' })
  @ApiResponse({ status: 200, description: 'Járművek listája.' })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Jármű lekérése' })
  @ApiResponse({ status: 200, description: 'Jármű adatai.' })
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Jármű módosítása' })
  @ApiResponse({ status: 200, description: 'Jármű sikeresen módosítva.' })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Jármű törlése' })
  @ApiResponse({ status: 200, description: 'Jármű sikeresen törölve.' })
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
