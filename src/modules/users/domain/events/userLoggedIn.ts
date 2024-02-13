import { IDomainEvent } from '@app/shared/domain/events/IDomainEvent';
import { User } from '../aggregates/User';
import { UniqueEntityID } from '@app/shared/domain/UniqueEntityID';

export class UserLoggedIn implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  public getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
