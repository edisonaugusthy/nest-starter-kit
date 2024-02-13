import { LoginDTO, LoginDTOResponse } from './LoginDTO';
import { LoginUseCaseErrors } from './LoginErrors';
import { IUserRepo } from '../../repos/IUserRepo';
import { User } from '../../../domain/aggregates/User';
import { UserName } from '../../../domain/value-object/userName';
import { UserPassword } from '../../../domain/value-object/userPassword';
import { Either, Result, success, failed } from '@app/shared/core/Result';
import { AppError } from '@app/shared/core/AppError';
import { UseCase } from '@app/shared/core/UseCase';

type Response = Either<
  | LoginUseCaseErrors.PasswordDoesntMatchError
  | LoginUseCaseErrors.UserNameDoesntExistError
  | AppError.UnexpectedError,
  Result<LoginDTOResponse>
>;

export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(request: LoginDTO): Promise<Response> {
    let user: User;
    let userName: UserName;

    try {
      const usernameOrError = UserName.create({ name: request.username });
      const passwordOrError = UserPassword.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return failed(Result.fail<any>(payloadResult.getErrorValue()));
      }

      user = await this.userRepo.getUserByUserName(userName);
      const userFound = !!user;

      if (!userFound) {
        return failed(new LoginUseCaseErrors.UserNameDoesntExistError());
      }

      return success(Result.ok<LoginDTOResponse>({} as any));
    } catch (err) {
      return failed(new AppError.UnexpectedError(err.toString()));
    }
  }
}
