import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<T, A extends UniqueEntityID> {
  protected readonly _id: A;
  public readonly props: T;

  constructor(props: T, id?: A) {
    this._id = id ? id : (new UniqueEntityID() as A);
    this.props = props;
  }

  public equals(object?: Entity<T, A>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
