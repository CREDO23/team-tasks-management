/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { UserEntity } from 'src/user/user.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T extends { [key: string]: any }> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;

const mockRepositoryFactory = <
  T extends { [key: string]: any },
>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: MockRepository<TaskEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockRepositoryFactory(),
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepositoryFactory(),
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<MockRepository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
  });

  it('task service should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('task repository should be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  describe('Find one task', () => {
    describe('When a task with the provided ID exists', () => {
      it('should return the task', async () => {
        const taskId = 1;
        const expectedTask = {};

        taskRepository?.findOne?.mockReturnValue(expectedTask);
        const result = await taskService.getTaskById(taskId);
        expect(result).toEqual(expectedTask);
      });
    });
    describe('When a task with the provided ID does not exist', () => {
      it('should throw a NotFoundException error', async () => {
        const taskId = 1;
        taskRepository?.findOne?.mockReturnValue(null);

        try {
          await taskService.getTaskById(taskId);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
          expect(error.message).toBe(`Task #${taskId} not found`);
        }
      });
    });
  });
});
