import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  carId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsOptional()
  protectionType?: string;

  @IsArray()
  @IsOptional()
  extras?: string[];

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
