import { Result } from '@app/shared/core/Result';
import { UseCaseError } from '@app/shared/core/UseCaseError';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        message: `An unexpected error occurred.`,
        error: err,
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.error(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
