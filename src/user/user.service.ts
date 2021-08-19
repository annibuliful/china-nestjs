import { Inject, Injectable } from '@nestjs/common';
import { StringOrNumber } from '../commmon/interfaces/common';
import { IService } from '../commmon/interfaces/service';
import { ChinaDbDriver } from '../drivers/china-db';
import { UserDto } from './user.dto';
import * as yup from 'yup';

@Injectable()
export class UserService implements IService<UserDto> {
  constructor(
    @Inject('ChinaDbDriver')
    private chinaDbDriver: ChinaDbDriver<UserDto>,
  ) {}
  async create(data: Omit<UserDto, 'id'>): Promise<UserDto> {
    // const schema = yup.object().shape({
    //   username: yup.string().required('username is required'),
    //   password: yup.string().required('password is required').min(8),
    // });
    // try {
    //   await schema.validate(data);
    //   return this.chinaDbDriver.insert(data);

    // } catch (e) {
    //   throw e;
    // }

    return this.chinaDbDriver.insert(data);
  }

  getById: (id: StringOrNumber) => Promise<UserDto>;
  get: (query: any) => Promise<UserDto[]>;
  update: (id: StringOrNumber) => Promise<UserDto>;
  delete: (id: StringOrNumber) => Promise<UserDto & { message: string }>;
}
