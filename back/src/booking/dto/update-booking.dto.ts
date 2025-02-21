import { IsInt, IsDateString, IsOptional } from 'class-validator';

export class UpdateBookingDto {
  @IsInt()
  @IsOptional()
  carId?: number;  // Jármű ID

  @IsInt()
  @IsOptional()
  userId?: number;  // Felhasználó ID

  @IsDateString()
  @IsOptional()
  startDate?: string;  // Kezdő dátum

  @IsDateString()
  @IsOptional()
  endDate?: string;  // Befejező dátum
}
