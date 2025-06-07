import { TaskRefactor1749239013792 } from 'src/migrations/1749239013792-task-refactor';
import { TaskEntity } from 'src/task/task.entity';
import { UserEntity } from 'src/user/user.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pas123',
  database: 'team_tasks_management',
  entities: [TaskEntity, UserEntity],
  migrations: [TaskRefactor1749239013792],
});
