import { BaseInterface } from '../common';

export interface UserInterface extends BaseInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  tasks?: string[];
}
