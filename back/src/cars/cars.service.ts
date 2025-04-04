import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly db: PrismaService) {}

  async create(createCarDto: CreateCarDto, token: string) {
    try {
      const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenValue },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      if (tokenRecord.user.isAdmin === false) {
        throw new UnauthorizedException('User is not an admin');
      }

      return this.db.car.create({
        data: createCarDto,
      });
    } catch (error) {
      throw new NotFoundException('Server error');
    }
  }

  findAll() {
    return this.db.car.findMany();
  }

  findOne(id: number) {
    return this.db.car.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCarDto: UpdateCarDto, token: string) {
    try {
      const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenValue },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      if (tokenRecord.user.isAdmin === false) {
        throw new UnauthorizedException('User is not an admin');
      }

      return this.db.car.update({
        where: { id },
        data: updateCarDto,
      });
    } catch (error) {
      throw new NotFoundException('Server error');
    }
  }

  async remove(id: number, token: string) {
    try {
      const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

      const tokenRecord = await this.db.token.findUnique({
        where: { token: tokenValue },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid token');
      }

      if (tokenRecord.user.isAdmin === false) {
        throw new UnauthorizedException('User is not an admin');
      }

      return this.db.car.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Server error');
    }
  }
}
