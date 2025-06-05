import { IsNotEmpty, IsString, Min } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Min(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
