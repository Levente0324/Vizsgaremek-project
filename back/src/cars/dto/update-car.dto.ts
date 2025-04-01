import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'Gyártó',
  })
  @IsString()
  @IsOptional()
  manufacturer?: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Modell',
  })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiProperty({
    example: 'Sedan',
    description: 'Típus',
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({
    example: '4',
    description: 'Ülések száma',
  })
  @IsInt()
  @IsOptional()
  numberOfSeats?: number;

  @ApiProperty({
    example: '5',
    description: 'Bőröndök száma',
  })
  @IsInt()
  @IsOptional()
  numberOfSuitcases?: number;

  @ApiProperty({
    example: 'Benzin',
    description: 'Üzemanyag típus',
  })
  @IsString()
  @IsOptional()
  fuelType?: string;

  @ApiProperty({
    example: 'Manual',
    description: 'Kuplung típus',
  })
  @IsString()
  @IsOptional()
  clutchType?: string;

  @ApiProperty({
    example: '7000',
    description: 'Napi ár',
  })
  @IsNumber()
  @IsOptional()
  priceForOneDay?: number;

  @ApiProperty({
    example: true,
    description: 'Elérhető-e a jármű',
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsOptional()
  @IsInt()
  bookId?: number;
}
