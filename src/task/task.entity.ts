import { TaskStatusEnum } from 'src/contracts/task/task.enums';
import { TaskInterface } from 'src/contracts/task/task.interface';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
export class TaskEntity implements TaskInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.BACKLOG,
  })
  status: string;

  @ManyToMany(() => UserEntity, (user) => user.tasks, {
    cascade: true,
  })
  assignees: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
