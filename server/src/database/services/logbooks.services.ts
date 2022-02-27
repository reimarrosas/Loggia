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

export const updateLogbook = async (
  logbookName: string,
  logbookId: number,
  userId: number
) => {
  try {
    await db.none(
      `
        UPDATE logbooks
        SET logbook_name = $1
        WHERE logbook_id = $2
          AND user_id = $3
    `,
      [logbookName, logbookId, userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};

export const deleteLogbook = async (logbookId: number, userId: number) => {
  try {
    await db.none(
      `
        DELETE FROM logbooks
        WHERE logbook_id = $1
          AND user_id = $2
    `,
      [logbookId, userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
