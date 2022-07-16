import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  pageNumber: number;
  @IsObject()
  @IsOptional()
  sort?: {
    [key: string]: string;
  };
  @IsString()
  @IsOptional()
  search?: string;
}
