export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: T | string;
  private _value: T;

  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue' instead.",
      );
    }

    return this._value;
  }

  public getErrorValue(): T {
    return this.error as T;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.ok();
  }
}

export type Either<L, A> = Failed<L, A> | Success<L, A>;

class Failed<ErrorType, SuccessType> {
  readonly value: ErrorType;

  constructor(value: ErrorType) {
    this.value = value;
  }

  isFailed(): this is Failed<ErrorType, SuccessType> {
    return true;
  }

  isSuccess(): this is Success<ErrorType, SuccessType> {
    return false;
  }
}

class Success<ErrorType, SuccessType> {
  readonly value: SuccessType;

  constructor(value: SuccessType) {
    this.value = value;
  }

  isFailed(): this is Failed<ErrorType, SuccessType> {
    return false;
  }

  isSuccess(): this is Success<ErrorType, SuccessType> {
    return true;
  }
}

export const failed = <L, A>(l: L): Either<L, A> => {
  return new Failed(l);
};

export const success = <L, A>(a: A): Either<L, A> => {
  return new Success<L, A>(a);
};
