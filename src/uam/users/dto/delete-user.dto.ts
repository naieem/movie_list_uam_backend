import { IsEmail, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
