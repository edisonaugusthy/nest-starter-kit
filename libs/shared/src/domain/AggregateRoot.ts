import { Entity } from './Entity';
import { IDomainEvent } from './events/IDomainEvent';
import { UniqueEntityID } from './UniqueEntityID';

export abstract class AggregateRoot<T, A extends UniqueEntityID> extends Entity<
  T,
  A
> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): A {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    this.logEventAdded(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      '[Event Created]:',
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
