import {
  IsString,
  IsInt,
  IsBoolean,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'Gyártó',
    required: true,
  })
  @IsString()
  manufacturer: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Modell',
    required: true,
  })
  @IsString()
  model: string;

  @ApiProperty({
    example: 'Sedan',
    description: 'Típus',
    required: true,
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: '4',
    description: 'Ülések száma',
    required: true,
  })
  @IsInt()
  numberOfSeats: number;

  @ApiProperty({
    example: '5',
    description: 'Bőröndök száma',
    required: true,
  })
  @IsInt()
  numberOfSuitcases: number;

  @ApiProperty({
    example: 'Benzin',
    description: 'Üzemanyag típus',
    required: true,
  })
  @IsString()
  fuelType: string;

  @ApiProperty({
    example: 'Manual',
    description: 'Kuplung típus',
    required: true,
  })
  @IsString()
  clutchType: string;

  @ApiProperty({
    example: '8000',
    description: 'Napi ár',
    required: true,
  })
  @IsNumber()
  priceForOneDay: number;

  @ApiProperty({
    example: true,
    description: 'Elérhetőség',
    required: true,
  })
  @IsBoolean()
  isAvailable: boolean;

  @IsOptional()
  @IsInt()
  bookId?: number;
}
