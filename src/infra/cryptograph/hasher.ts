/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import IHasher from '../../application/contracts/hasher';

export default class Hasher implements IHasher {
  private readonly SALT = 10;

  encrypt(value: string): string {
    return bcrypt.hashSync(value, this.SALT);
  }

  compare(given: string, toCompare: string): boolean {
    return bcrypt.compareSync(given, toCompare);
  }
}