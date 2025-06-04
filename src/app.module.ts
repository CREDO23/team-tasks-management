import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './user/role/role.module';
import { RolePermissionModule } from './user/role/role-permission/role-permission.module';
import { TaskStatusModule } from './task/task-status/task-status.module';
import { TaskPriorityModule } from './task/task-priority/task-priority.module';

@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pas123',
      database: 'team_tasks_management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    RolePermissionModule,
    TaskStatusModule,
    TaskPriorityModule,
  ],
})
export class AppModule {}
