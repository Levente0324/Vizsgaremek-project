import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly db: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

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

  async findAll(token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.db.booking.findMany({
        include: {
          car: true,
          protection: true,
          extras: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      if (tokenRecord.user.isAdmin === false) {
        throw new UnauthorizedException('User is not an admin');
      }

      return this.db.booking.findUnique({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      return this.db.booking.update({
        where: { id },
        data: updateBookingDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, token: string) {
    try {
      const tokenObj = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenObj },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

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
    } catch (error) {
      throw error;
    }
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
