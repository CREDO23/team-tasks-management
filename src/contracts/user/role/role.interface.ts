import { BaseInterface } from 'src/contracts/common';

export interface RoleInterface extends BaseInterface {
  name: string;
  description?: string;
  permissions: string[];
}
