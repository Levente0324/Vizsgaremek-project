import { IsString, IsInt, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  manufacturer?: string;  // Gyártó

  @IsString()
  @IsOptional()
  model?: string;  // Modell

  @IsString()
  @IsOptional()
  type?: string;  // Típus

  @IsInt()
  @IsOptional()
  numberOfSeats?: number;  // Ülések száma

  @IsInt()
  @IsOptional()
  numberOfSuitcases?: number;  // Bőröndök száma

  @IsString()
  @IsOptional()
  fuelType?: string;  // Üzemanyag típus

  @IsString()
  @IsOptional()
  clutchType?: string;  // Kuplung típus

  @IsNumber()
  @IsOptional()
  priceForOneDay?: number;  // Napi ár

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;  // Elérhetőség

  @IsOptional()
  @IsInt()
  bookId?: number;  // Foglalás ID (ha van)
}
