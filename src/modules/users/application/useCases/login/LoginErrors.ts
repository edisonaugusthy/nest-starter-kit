import { Result } from '@app/shared/core/Result';
import { UseCaseError } from '@app/shared/core/UseCaseError';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoginUseCaseErrors {
  export class UserNameDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect.`,
      } as UseCaseError);
    }
  }

  export class PasswordDoesntMatchError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Password doesnt match error.`,
      } as UseCaseError);
    }
  }
}
