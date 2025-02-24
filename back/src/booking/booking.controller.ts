import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Foglalás létrehozása' })
  @ApiResponse({ status: 201, description: 'Foglalás sikeresen létrehozva.' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalások listázása' })
  @ApiResponse({ status: 200, description: 'Foglalások listája.' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Foglalás lekérése' })
  @ApiResponse({ status: 200, description: 'Foglalás adatai.' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Foglalás módosítása' })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen módosítva.' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás törlése' })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen törölve.' })
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
