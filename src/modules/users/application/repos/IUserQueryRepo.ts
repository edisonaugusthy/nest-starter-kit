import { User } from '../../domain/aggregates/User';

import { UserName } from '../../domain/value-object/userName';

export interface IUserQueryRepo {
  getUserByUserName(userName: UserName | string): Promise<User>;
}
