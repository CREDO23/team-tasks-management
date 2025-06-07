import { BaseInterface } from '../common';
import { TaskInterface } from '../task/task.interface';

export interface UserInterface extends BaseInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  tasks?: TaskInterface[];
}
