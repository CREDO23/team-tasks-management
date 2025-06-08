/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from 'src/common/exceptions/http.exeption';
import { WrapResponseDataInterceptor } from 'src/common/interceptors/wrap-data.interceptor.ts/wrap-response-data.interceptor';
import { TaskStatusEnum } from 'src/contracts/task/task.enums';
import { TaskInterface } from 'src/contracts/task/task.interface';
import { CreateTaskDto } from 'src/task/DTOs/create-task.dto';
import { TaskModule } from 'src/task/task.module';
import * as request from 'supertest';

describe('Task', () => {
  let app: INestApplication;
  const createTaskDto: CreateTaskDto = {
    title: 'test task',
    description: 'test task description',
  };
  let createdTask: TaskInterface;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pas123',
          database: 'team_tasks_management_test',
          autoLoadEntities: true,
          synchronize: true,
        }),
        TaskModule,
      ],
    }).compile();

    app = testingModule.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new WrapResponseDataInterceptor());
    await app.init();
  });

  it('Create a task [POST /api/tasks/]', async () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201)
      .then((res: request.Response) => {
        const task = res.body.data as TaskInterface;
        expect(task.title).toEqual(createTaskDto.title);
        expect(task.description).toEqual(createTaskDto.description);
        expect(task.status).toEqual(TaskStatusEnum.BACKLOG);
        expect(task.id).toBeDefined();

        createdTask = task;
      });
  });

  it.todo('Get all tasks [GET /api/tasks/]');
  it('Get a task [GET /api/tasks/:id]', async () => {
    return request(app.getHttpServer())
      .get('/tasks/' + createdTask.id)
      .expect(200)
      .then((res: request.Response) => {
        const task = res.body.data as TaskInterface;
        expect(task.title).toEqual(createdTask.title);
        expect(task.description).toEqual(createdTask.description);
        expect(task.status).toEqual(createdTask.status);
        expect(task.id).toBeDefined();
      });
  });
  it.todo('Update a task [PATCH /api/tasks/:id]');
  it.todo('Delete a task [DELETE /api/tasks/:id]');

  afterAll(async () => {
    await app.close();
  });
});
