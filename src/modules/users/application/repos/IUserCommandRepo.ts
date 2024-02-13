import { User } from '../../domain/aggregates/User';
import { UserEmail } from '../../domain/value-object/userEmail';
import { UserName } from '../../domain/value-object/userName';

export interface IUserCommandRepo {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  save(user: User): Promise<void>;
}
