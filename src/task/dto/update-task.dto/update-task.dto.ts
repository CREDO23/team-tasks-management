import { CreateTaskDto } from '../create-task.dto/create-task.dto';

export class UpdateTaskDto implements Partial<CreateTaskDto> {
  title?: string;
  description?: string;
  status?: string;
}
