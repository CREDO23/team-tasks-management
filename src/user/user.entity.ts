import { RoleEnum } from 'src/contracts/role/role.enums';
import { UserInterface } from 'src/contracts/user/user.interface';
import { TaskEntity } from 'src/task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: string;

  @JoinTable({ name: 'user_tasks' })
  @ManyToMany(() => TaskEntity, (task) => task.assignees)
  tasks: TaskEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
