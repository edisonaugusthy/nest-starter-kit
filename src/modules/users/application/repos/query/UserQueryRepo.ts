import { UserName } from '../../../domain/value-object/userName';
import { User } from '../../../domain/aggregates/User';
import { UserMap } from '../../mappers/UserMap';
import { IUserQueryRepo } from '../IUserQueryRepo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserDocument,
  UserModel,
} from 'src/modules/users/infra/database/postgress/user';
import { Model } from 'mongoose';

@Injectable()
export class UserQueryRepo implements IUserQueryRepo {
  private models: any;

  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const baseUser = await this.userModel.findOne({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName,
      },
    });
    if (!!baseUser === false) throw new Error('User not found.');
    return UserMap.toDomain(baseUser);
  }
}
