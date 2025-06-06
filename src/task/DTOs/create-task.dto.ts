import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly status: string;

  @IsOptional()
  @IsString({ each: true })
  @IsEmail(undefined, { each: true })
  assignees?: string[];
}
