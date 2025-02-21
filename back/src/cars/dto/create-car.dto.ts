import { IsString, IsInt, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateCarDto {
  @IsString()
  manufacturer: string;  // Gyártó

  @IsString()
  model: string;  // Modell

  @IsString()
  type: string;  // Típus (pl. Sedan, SUV, stb.)

  @IsInt()
  numberOfSeats: number;  // Ülések száma

  @IsInt()
  numberOfSuitcases: number;  // Bőröndök száma

  @IsString()
  fuelType: string;  // Üzemanyag típus (pl. Benzin, Diesel)

  @IsString()
  clutchType: string;  // Kuplung típus (pl. Manuális, Automatikus)

  @IsNumber()
  priceForOneDay: number;  // Napi ár

  @IsBoolean()
  isAvailable: boolean;  // Elérhetőség

  @IsOptional()
  @IsInt()
  bookId?: number;  // Foglalás ID (ha van)
}
