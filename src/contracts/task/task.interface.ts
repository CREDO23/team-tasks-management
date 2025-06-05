import { BaseInterface } from '../common';
import { UserInterface } from '../user/user.interface';

export interface TaskInterface extends BaseInterface {
  title: string;
  description?: string;
  status: string;
  assignees?: UserInterface[];
}
