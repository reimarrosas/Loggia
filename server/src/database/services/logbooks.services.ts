import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export const getAllLogbooks = async (userId: number) => {
  try {
    return await db.manyOrNone(
      `
      SELECT *
      FROM logbooks
      WHERE user_id = $1
    `,
      [userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
