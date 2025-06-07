export interface BaseInterface {
  readonly id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type OmittedFieldsOnCreate = 'id' | 'createdAt' | 'updatedAt';
