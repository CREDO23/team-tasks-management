import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { TaskStatusModule } from './task-status/task-status.module';
import { TaskPriorityModule } from './task-priority/task-priority.module';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
})
export class AppModule {}
