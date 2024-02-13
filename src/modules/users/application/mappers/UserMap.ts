import { User } from '../../domain/aggregates/User';
import { UserDTO } from '../../infra/dto/user';
import { UserName } from '../../domain/value-object/userName';
import { UserPassword } from '../../domain/value-object/userPassword';
import { UserEmail } from '../../domain/value-object/userEmail';
import { UniqueEntityID } from '@app/shared/domain/UniqueEntityID';
import { Mapper } from '@app/shared/infra/Mapper';

export class UserMap implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted,
    };
  }

  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create({ name: raw.username });
    const userPasswordOrError = UserPassword.create({
      value: raw.user_password,
      hashed: true,
    });
    const userEmailOrError = UserEmail.create(raw.user_email);

    const userOrError = User.create(
      {
        username: userNameOrError.getValue(),
        isAdminUser: raw.is_admin_user,
        isDeleted: raw.is_deleted,
        isEmailVerified: raw.is_email_verified,
        password: userPasswordOrError.getValue(),
        email: userEmailOrError.getValue(),
      },
      UniqueEntityID.random(),
    );

    userOrError.isFailure ? console.log(userOrError.getErrorValue()) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static async toPersistence(user: User): Promise<any> {
    return {
      base_user_id: user.userId,
      user_email: user.email.value,
      is_email_verified: user.isEmailVerified,
      username: user.username.value,
      is_admin_user: user.isAdminUser,
      is_deleted: user.isDeleted,
    };
  }
}
