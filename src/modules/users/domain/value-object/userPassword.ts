import { Guard } from '@app/shared/core/Guard';
import { Result } from '@app/shared/core/Result';
import { ValueObject } from '@app/shared/domain/ValueObject';

export interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  public static minLength: number = 6;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public static create(props: IUserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');

    if (propsResult.isFailure) {
      return Result.fail<UserPassword>(propsResult.getErrorValue());
    } else {
      if (!props.hashed) {
        if (!this.isAppropriateLength(props.value)) {
          return Result.fail<UserPassword>(
            'Password doesnt meet criteria [8 chars min].',
          );
        }
      }

      return Result.ok<UserPassword>(
        new UserPassword({
          value: props.value,
          hashed: !!props.hashed === true,
        }),
      );
    }
  }
}
