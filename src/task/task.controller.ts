import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { UpdateTaskDto } from './DTOs/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  findAll() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
