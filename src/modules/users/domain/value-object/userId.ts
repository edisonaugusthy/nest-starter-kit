import { Guard } from '@app/shared/core/Guard';
import { Result } from '@app/shared/core/Result';
import { UniqueEntityID } from '@app/shared/domain/UniqueEntityID';

export class UserId extends UniqueEntityID {
  get id(): UniqueEntityID {
    return this.id;
  }

  private constructor(_id: string) {
    super(_id);
  }

  public static create(value: string): Result<UserId> {
    const guardResult = Guard.againstNullOrUndefined(value, 'value');
    if (guardResult.isFailure) {
      return Result.fail<UserId>(guardResult.getErrorValue());
    }
    return Result.ok<UserId>(new UserId(value));
  }
}
