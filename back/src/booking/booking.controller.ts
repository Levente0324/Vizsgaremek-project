import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Bookings endpoint')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás létrehozása' })
  @ApiResponse({
    status: 201,
    description: 'Foglalás sikeresen létrehozva',
    type: CreateBookingDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Headers('Authorization') token: string,
  ) {
    return this.bookingService.create(createBookingDto, token);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalások listázása' })
  @ApiResponse({ status: 200, description: 'Foglalások listája' })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findAll(@Headers('Authorization') token: string) {
    return this.bookingService.findAll(token);
  }

  @Get('extras')
  @ApiOperation({ summary: 'Kiegészítők listázása' })
  @ApiResponse({ status: 200, description: 'Kiegészítők listája' })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findAllExtras() {
    return this.bookingService.findAllExtras();
  }

  @Get('protections')
  @ApiOperation({ summary: 'Biztositások listázása' })
  @ApiResponse({ status: 200, description: 'Biztositások listája' })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findAllProtections() {
    return this.bookingService.findAllProtections();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás lekérése' })
  @ApiResponse({
    status: 200,
    description: 'Foglalás adatai',
    type: CreateBookingDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  findOne(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.bookingService.findOne(+id, token);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás módosítása' })
  @ApiResponse({
    status: 200,
    description: 'Foglalás sikeresen módosítva.',
    type: CreateBookingDto,
  })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Headers('Authorization') token: string,
  ) {
    return this.bookingService.update(+id, updateBookingDto, token);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('bearer'))
  @ApiOperation({ summary: 'Foglalás törlése' })
  @ApiResponse({ status: 200, description: 'Foglalás sikeresen törölve.' })
  @ApiResponse({ status: 400, description: 'Hibás kérés' })
  @ApiResponse({ status: 401, description: 'Nincs jogosultság' })
  @ApiResponse({ status: 404, description: 'Nem található' })
  remove(@Param('id') id: string, @Headers('Authorization') token: string) {
    return this.bookingService.remove(+id, token);
  }
}
