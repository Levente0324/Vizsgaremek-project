import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly db: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      // First verify that all extras exist
      if (createBookingDto.extras?.length) {
        const existingExtras = await this.db.extra.findMany({
          where: {
            id: {
              in: createBookingDto.extras.map(id => parseInt(id))
            }
          }
        });

        if (existingExtras.length !== createBookingDto.extras.length) {
          throw new Error('One or more selected extras do not exist');
        }

        // Then create the booking
        const booking = await this.db.booking.create({
          data: {
            carId: createBookingDto.carId,
            userId: createBookingDto.userId,
            startDate: new Date(createBookingDto.startDate),
            endDate: new Date(createBookingDto.endDate),
            totalPrice: createBookingDto.totalPrice,
            protection: createBookingDto.protectionType ? {
              create: {
                name: createBookingDto.protectionType,
                price: 0,
                description: '',
              }
            } : undefined,
            extras: {
              create: createBookingDto.extras.map(extraId => ({
                extra: {
                  connect: { 
                    id: parseInt(extraId)
                  }
                }
              }))
            }
          },
          include: {
            car: true,
            protection: true,
            extras: {
              include: {
                extra: true
              }
            }
          }
        });

        return booking;
      }

      // Create booking without extras
      return await this.db.booking.create({
        data: {
          carId: createBookingDto.carId,
          userId: createBookingDto.userId,
          startDate: new Date(createBookingDto.startDate),
          endDate: new Date(createBookingDto.endDate),
          totalPrice: createBookingDto.totalPrice,
          protection: createBookingDto.protectionType ? {
            create: {
              name: createBookingDto.protectionType,
              price: 0,
              description: '',
            }
          } : undefined
        },
        include: {
          car: true,
          protection: true,
          extras: {
            include: {
              extra: true
            }
          }
        }
      });

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
}
