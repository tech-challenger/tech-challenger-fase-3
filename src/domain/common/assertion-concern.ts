import { Comparable } from './comparable';

export class AssertionConcern<T> implements Comparable<T> {
  equals(object: object): boolean {
    throw new Error('Method not implemented.');
  }

  protected assertArgumentEquals(
    anObject1: Comparable<T>,
    anObject2: Comparable<T>,
    aMessage: string,
  ) {
    if (!anObject1.equals(anObject2)) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentFalse(aBoolean: boolean, aMessage: string) {
    if (aBoolean) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentMaxLength(
    aString: string,
    aMaximum: number,
    aMessage: string,
  ) {
    length = aString.trim().length;
    if (length > aMaximum) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentMinMaxLength(
    aString: string,
    aMinimum: number,
    aMaximum: number,
    aMessage: string,
  ) {
    length = aString.trim().length;
    if (length < aMinimum || length > aMaximum) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentNotEmpty(aString: string, aMessage: string) {
    if (!aString || aString.trim().length == 0) {
      throw new Error(aMessage);
    }
  }

  protected assertArrayNotEmpty(items: any[], aMessage: string) {
    if (!items || items.length == 0) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentNotEquals(
    anObject1: Comparable<T>,
    anObject2: Comparable<T>,
    aMessage: string,
  ) {
    if (anObject1.equals(anObject2)) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentNotNull(anObject: any, aMessage: string) {
    if (!anObject) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentRange(
    aValue: number,
    aMinimum: number,
    aMaximum: number,
    aMessage: string,
  ) {
    if (aValue < aMinimum || aValue > aMaximum) {
      throw new Error(aMessage);
    }
  }

  protected assertArgumentTrue(aBoolean: boolean, aMessage: string) {
    if (!aBoolean) {
      throw new Error(aMessage);
    }
  }

  protected assertStateFalse(aBoolean: boolean, aMessage: string) {
    if (aBoolean) {
      throw new Error(aMessage);
    }
  }

  protected assertStateTrue(aBoolean: boolean, aMessage: string) {
    if (!aBoolean) {
      throw new Error(aMessage);
    }
  }
}
