import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export interface UserCredentials {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export const findUserByEmail = async (
  email: string
): Promise<UserCredentials | null> => {
  try {
    return await db.oneOrNone(
      `
        SELECT user_id, user_name, user_email, user_password
        FROM users
        WHERE user_email = $1
      `,
      [email]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};

export const createUser = async (user: Partial<UserCredentials>) => {
  try {
    await db.none(
      `
        INSERT INTO users
          (user_name, user_email, user_password)
        VALUES
          ($<user_name>, $<user_email>, $<user_password>)
      `,
      user
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
