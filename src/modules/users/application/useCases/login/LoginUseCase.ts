import { LoginDTO, LoginDTOResponse } from './LoginDTO';
import { LoginUseCaseErrors } from './LoginErrors';
import { IUserQueryRepo } from '../../repos/IUserQueryRepo';
import { User } from '../../../domain/aggregates/User';
import { UserName } from '../../../domain/value-object/userName';
import { UserPassword } from '../../../domain/value-object/userPassword';
import { Either, Result, success, failed } from '@app/shared/core/Result';
import { AppError } from '@app/shared/core/AppError';
import { UseCase } from '@app/shared/core/UseCase';
import { Inject, Injectable } from '@nestjs/common';

type Response = Either<
  | LoginUseCaseErrors.PasswordDoesntMatchError
  | LoginUseCaseErrors.UserNameDoesntExistError
  | AppError.UnexpectedError,
  Result<LoginDTOResponse>
>;
@Injectable()
export class LoginUserUseCase implements UseCase<LoginDTO, Promise<Response>> {
  constructor(
    @Inject('IUserQueryRepo') private userQueryRepo: IUserQueryRepo,
  ) {}

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

      user = await this.userQueryRepo.getUserByUserName(userName);
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
