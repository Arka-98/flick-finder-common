import crypto from 'crypto';

export class UserUtil {
  public static hashPassword(password: string) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return [hash, salt];
  }

  public static comparePassword(password: string, hash: string, salt: string) {
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');

    return hashedPassword === hash;
  }
}
