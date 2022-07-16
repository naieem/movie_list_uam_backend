import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
}
