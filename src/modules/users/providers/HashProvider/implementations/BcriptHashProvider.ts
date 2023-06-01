import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { hash, compare } from 'bcryptjs';

export default class BcriptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, password: string): Promise<boolean> {
    return compare(payload, password);
  }
}
