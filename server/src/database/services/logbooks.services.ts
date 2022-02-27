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

export const createLogbook = async (logbookName: string, userId: number) => {
  try {
    await db.none(
      `
        INSERT INTO logbooks
          (logbook_name)
        VALUES
          ($1)
        WHERE user_id = $2
    `,
      [logbookName, userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
