import { StringOrNumber } from 'src/commmon/interfaces/common';

export class ChinaDbDriver<
  T extends { id?: StringOrNumber },
  Q extends T & Record<string, string | number | boolean>,
> {
  private stores: T[] = [];
  private counterId = 0;
  private uniqueField: keyof T;
  constructor(uniqueField?: keyof T) {
    this.uniqueField = uniqueField;
  }

  duplicate(data: T) {
    return this.stores.find(
      (value) => value[this.uniqueField] === data[this.uniqueField],
    );
  }

  insert(data: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const insertData = {
        id: (data.id ? data.id : ++this.counterId).toString(),
        ...data,
      };
      const isDuplicated = this.uniqueField ? this.duplicate(data as T) : false; // skip when there is no unique field
      if (isDuplicated) {
        reject(`Duplicated ${this.uniqueField}`);
      }

      this.stores.push(insertData as T);
      resolve(insertData as T);
    });
  }
  get(query: Partial<Q>): Promise<T[]> {
    return new Promise((resolve) => {
      let result = Array.from(this.stores);

      Object.entries(query).forEach(([key, queryValue]) => {
        result = result.filter((el) => {
          const value = el[key];
          switch (typeof value) {
            case 'number':
              return value === queryValue;
            case 'string':
              return value.toLowerCase().includes(queryValue.toLowerCase());
            case 'boolean':
              return value === queryValue;
          }
        });
      });
      resolve(result);
    });
  }

  getById(id: StringOrNumber) {
    return new Promise((resolve) => {
      resolve(this.stores.find((value) => value.id === id) ?? null);
    });
  }

  resetStores() {
    this.stores = [];
  }
  delete(id: StringOrNumber): Promise<T> {
    return new Promise((resolve, reject) => {
      const deleteIndex = this.findIndex(id);
      const isExist = deleteIndex !== -1;
      if (!isExist) {
        reject('not found id');
      }
      this.stores.splice(deleteIndex, 1);
      resolve(this.stores[deleteIndex]);
    });
  }

  findIndex(id: StringOrNumber) {
    return this.stores.findIndex((value) => value.id === id);
  }

  update(id: StringOrNumber, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      const updateIndex = this.findIndex(id);
      const isExist = updateIndex !== -1;
      if (!isExist) {
        reject('not found id');
      }
      this.stores[updateIndex] = { ...data, id };
      resolve({ ...data, id });
    });
  }

  // for testing
  getStore() {
    return this.stores;
  }
}
