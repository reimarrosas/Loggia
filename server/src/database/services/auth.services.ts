import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export interface UserCredentials {
  id?: number;
  name?: string;
  email?: string;
}

export const findUserByEmail = async (
  email: string
): Promise<UserCredentials | null> => {
  try {
    return db.oneOrNone(
      `SELECT user_id, user_name, user_email FROM users WHERE user_email = $1`,
      [email]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
