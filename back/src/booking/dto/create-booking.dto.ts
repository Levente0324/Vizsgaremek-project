import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @IsNotEmpty()
  carId: number;  // Jármű ID

  @IsInt()
  @IsNotEmpty()
  userId: number;  // Felhasználó ID

  @IsDateString()
  @IsNotEmpty()
  startDate: string;  // Kezdő dátum

  @IsDateString()
  @IsNotEmpty()
  endDate: string;  // Befejező dátum
}
