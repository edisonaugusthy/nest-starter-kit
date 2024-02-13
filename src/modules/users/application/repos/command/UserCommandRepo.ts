import { UserName } from '../../../domain/value-object/userName';
import { User } from '../../../domain/aggregates/User';
import { UserMap } from '../../mappers/UserMap';
import { UserEmail } from '../../../domain/value-object/userEmail';
import { IUserCommandRepo } from '../IUserCommandRepo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCommandRepo implements IUserCommandRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }

  async exists(userEmail: UserEmail): Promise<boolean> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        user_email: userEmail.value,
      },
    });
    return !!baseUser === true;
  }

  async getUserByUserName(userName: UserName | string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        username:
          userName instanceof UserName ? (<UserName>userName).value : userName,
      },
    });
    if (!!baseUser === false) throw new Error('User not found.');
    return UserMap.toDomain(baseUser);
  }

  async getUserByUserId(userId: string): Promise<User> {
    const BaseUserModel = this.models.BaseUser;
    const baseUser = await BaseUserModel.findOne({
      where: {
        base_user_id: userId,
      },
    });
    if (!!baseUser === false) throw new Error('User not found.');
    return UserMap.toDomain(baseUser);
  }

  async save(user: User): Promise<void> {
    const UserModel = this.models.BaseUser;
    const exists = await this.exists(user.email);

    if (!exists) {
      const rawSequelizeUser = await UserMap.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }

    return;
  }
}
