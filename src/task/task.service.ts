import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is task 2',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'This is task 3',
      status: 'Completed',
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (task) {
      return task;
    } else {
      throw new NotFoundException(`Task #${id} not found`);
    }
  }

  createTask(task: CreateTaskDto) {
    this.tasks.push({ ...task, id: this.tasks.length });
  }

  updateTask(id: number, task: UpdateTaskDto) {
    const existingTask = this.tasks.find((t) => t.id === id);
    if (existingTask) {
      Object.assign(existingTask, task);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
