import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export interface UserCredentials {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
  is_verified: boolean;
}

export const findUserByEmail = async (
  email: string
): Promise<UserCredentials | null> => {
  try {
    return await db.oneOrNone(
      `
        SELECT *
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

export const verifyUser = async (email: string): Promise<number> => {
  try {
    const { rowCount } = await db.result(
      `
        UPDATE users
        SET is_verified = TRUE
        WHERE user_email = $1
    `,
      [email]
    );

    return rowCount;
  } catch (err) {
    throw new HttpInternal();
  }
};
