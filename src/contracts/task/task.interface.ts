import { BaseInterface } from '../common';
import { UserInterface } from '../user/user.interface';

export interface TaskInterface extends BaseInterface {
  title: string;
  taskNumber: number;
  description?: string;
  status: string;
  assignees?: UserInterface[];
}
