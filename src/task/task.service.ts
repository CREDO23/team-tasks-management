import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './DTOs/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async getAllTasks() {
    return this.taskRepository.find();
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return task;
  }

  async createTask(task: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      ...task,
      status: task.status ?? 'OPEN',
    });
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.preload({
      id,
      ...data,
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    return this.taskRepository.remove(task);
  }
}
