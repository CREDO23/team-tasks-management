import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OmittedFieldsOnCreate } from 'src/contracts/common';
import { TaskInterface } from 'src/contracts/task/task.interface';

export class CreateTaskDto
  implements Omit<TaskInterface, OmittedFieldsOnCreate>
{
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
}
