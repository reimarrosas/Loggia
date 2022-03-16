import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export const getAllEvents = async (logId: number) => {
  try {
    await db.manyOrNone(
      `
        SELECT *
        FROM events
        WHERE log_id = $1
    `,
      [logId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
