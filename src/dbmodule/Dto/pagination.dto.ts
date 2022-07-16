import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class PaginationDto {
  @IsNumber()
  pageNumber: number;
  @IsObject()
  @IsOptional()
  sort?: {
    [key: string]: string;
  };
  @IsString()
  @MinLength(3)
  @IsOptional()
  search?: string;
}
