import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private readonly db: PrismaService) {}

  create(createCarDto: CreateCarDto) {
    return this.db.car.create({
      data: createCarDto,
    });
  }

  findAll() {
    return this.db.car.findMany();
  }

  findOne(id: number) {
    return this.db.car.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.db.car.update({
      where: { id },
      data: updateCarDto,
    });
  }

  remove(id: number) {
    return this.db.car.delete({
      where: { id },
    });
  }
}
