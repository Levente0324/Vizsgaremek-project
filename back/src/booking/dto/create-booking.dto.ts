import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    example: '10',
    description: 'Kocsi azonosítója',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @ApiProperty({
    example: '2',
    description: 'Felhasználó azonosítója',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: '2025-07-01',
    description: 'Lefoglalas kezdeti dátuma',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    example: '2025-07-10',
    description: 'Lefoglalas befejező dátuma',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    example: '2',
    description: 'Biztosítás azonosítója',
    required: false,
  })
  @IsString()
  @IsOptional()
  protectionType?: string;

  @ApiProperty({
    example: [1, 3],
    description: 'Kiegészítők azonosítói',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => value.map(String))
  extras?: string[];

  @ApiProperty({
    example: '100000',
    description: 'Teljes ár',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
