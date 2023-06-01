export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, password: string): Promise<boolean>;
}
