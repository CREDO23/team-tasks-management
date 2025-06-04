import { BaseInterface } from '../common';

export interface TaskInterface extends BaseInterface {
  title: string;
  description?: string;
  status: string;
  assignees?: string[];
}
