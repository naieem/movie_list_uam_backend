import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  pageNumber: number;
  @IsObject()
  @IsOptional()
  @ApiProperty({
    default: {
      Title: 'asc',
      Year: 'asc',
    },
  })
  sort?: {
    [key: string]: string;
  };
  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;
}
