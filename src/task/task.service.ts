import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './DTOs/update-task.dto';
import { UserEntity } from 'src/user/user.entity';
import { TaskStatusEnum } from 'src/contracts/task/task.enums';
import { PaginationQueryDto } from 'src/common/DTOs/pagination-query.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllTasks(paginationQuery: PaginationQueryDto) {
    return this.taskRepository.find({
      relations: {
        assignees: true,
      },
      skip: paginationQuery.offset,
      take: paginationQuery.limit,
    });
  }

  async getTaskById(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: {
        assignees: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return task;
  }

  async createTask(task: CreateTaskDto) {
    const assignees =
      task.assignees &&
      (await Promise.all(
        task.assignees.map((email) => this.preloadAssigneeByEmail(email)),
      ));

    const newTask = this.taskRepository.create({
      ...task,
      status: task.status ?? TaskStatusEnum.BACKLOG,
      assignees,
    });
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, data: UpdateTaskDto) {
    const assignees =
      data.assignees &&
      (await Promise.all(
        data.assignees.map((email) => this.preloadAssigneeByEmail(email)),
      ));

    const task = await this.taskRepository.preload({
      id,
      ...data,
      assignees,
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

  async preloadAssigneeByEmail(email: string) {
    const assignee = await this.userRepository.findOne({
      where: { email },
    });

    if (!assignee) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return assignee;
  }
}
