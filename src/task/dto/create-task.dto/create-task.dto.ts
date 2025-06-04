import { IsString } from 'class-validator';
import { Task } from 'src/task/entities/task.entity';

export class CreateTaskDto implements Omit<Task, 'id'> {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly status: string;
}
