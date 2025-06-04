import { IsOptional, IsString } from 'class-validator';
import { TaskInterface } from 'src/contracts/task/task.interface';

export class CreateTaskDto implements Omit<TaskInterface, 'id'> {
  @IsString()
  readonly title: string;
  @IsString()
  @IsOptional()
  readonly description: string;
  @IsString()
  @IsOptional()
  readonly status: string;
}
