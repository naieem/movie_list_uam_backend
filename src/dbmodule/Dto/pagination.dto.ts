import { IsArray, IsNumber, IsObject, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  pageNumber: number;
  @IsObject()
  @IsOptional()
  sort?: {
    [key: string]: string;
  };
  @IsArray()
  @IsOptional()
  search?: {
    [key: string]: string;
  }[];
}
