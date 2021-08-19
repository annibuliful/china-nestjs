import { StringOrNumber } from './common';

export interface IService<T, Q = any> {
  create: (data: Partial<T>) => Promise<T>;
  getById: (id: StringOrNumber) => Promise<T>;
  get: (query: Q) => Promise<T[]>;
  update: (id: StringOrNumber) => Promise<T>;
  delete: (id: StringOrNumber) => Promise<T & { message: string }>;
}
