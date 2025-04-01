import { IsInt, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto {
  @ApiProperty({
    example: '11',
    description: 'Kocsi azonosítója',
  })
  @IsInt()
  @IsOptional()
  carId?: number;

  @ApiProperty({
    example: '2',
    description: 'Felhasználó azonosítója',
  })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    example: '2025-07-01',
    description: 'Lefoglalas kezdeti dátuma',
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({
    example: '2025-07-10',
    description: 'Lefoglalas befejező dátuma',
  })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
