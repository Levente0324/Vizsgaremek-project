import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly db: PrismaService) {}

  create(createBookingDto: CreateBookingDto) {
    return this.db.booking.create({
      data: createBookingDto,
    });
  }

  findAll() {
    return this.db.booking.findMany({
      include: {
        car: true,
      },
    });
  }

  findOne(id: number) {
    return this.db.booking.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.db.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  remove(id: number) {
    return this.db.booking.delete({
      where: { id },
    });
  }
}
