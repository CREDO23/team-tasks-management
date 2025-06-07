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
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { UpdateTaskDto } from './DTOs/update-task.dto';
import { PaginationQueryDto } from 'src/common/DTOs/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.taskService.getAllTasks(paginationQuery);
  }

  @Get(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post()
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  remove(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
