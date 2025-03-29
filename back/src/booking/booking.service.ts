import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly db: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const protectionPlan = await this.db.protectionPlan.findFirst({
        where: {
          name: createBookingDto.protectionType,
        },
      });

      const booking = await this.db.booking.create({
        data: {
          carId: createBookingDto.carId,
          userId: createBookingDto.userId,
          startDate: new Date(createBookingDto.startDate),
          endDate: new Date(createBookingDto.endDate),
          totalPrice: createBookingDto.totalPrice,
          protection:
            createBookingDto.protectionType && protectionPlan
              ? {
                  create: {
                    protectionPlanId: protectionPlan.id,
                  },
                }
              : undefined,
          extras: createBookingDto.extras
            ? {
                create: createBookingDto.extras.map((extraId) => ({
                  extra: {
                    connect: { id: parseInt(extraId) },
                  },
                })),
              }
            : undefined,
        },
      });

      return booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async findAll() {
    return this.db.booking.findMany({
      include: {
        car: true,
        protection: true,
        extras: true,
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

  async remove(id: number) {
    await this.db.$transaction([
      this.db.extraOnBookings.deleteMany({
        where: { bookingId: id },
      }),

      this.db.protection.deleteMany({
        where: { bookingId: id },
      }),

      this.db.booking.delete({
        where: { id },
      }),
    ]);
  }

  async findAllExtras() {
    return this.db.extra.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
      },
    });
  }

  async findAllProtections() {
    return this.db.protectionPlan.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
      },
    });
  }
}
