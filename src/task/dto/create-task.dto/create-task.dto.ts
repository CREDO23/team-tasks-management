import { IsOptional, IsString } from 'class-validator';
import { OmittedFieldsOnCreate } from 'src/contracts/common';
import { TaskInterface } from 'src/contracts/task/task.interface';

export class CreateTaskDto
  implements Omit<TaskInterface, OmittedFieldsOnCreate>
{
  @IsString()
  readonly title: string;
  @IsString()
  @IsOptional()
  readonly description: string;
  @IsString()
  @IsOptional()
  readonly status: string;
}
