import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'The description of the task',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: 'The status of the task',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly status?: string;

  @ApiProperty({
    description: 'The assignees of the task',
  })
  @IsOptional()
  @IsString({ each: true })
  @IsEmail(undefined, { each: true })
  assignees?: string[];
}
