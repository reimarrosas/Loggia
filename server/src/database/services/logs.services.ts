import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export const getAllLogs = async (logbookId: number, userId: number) => {
  try {
    return await db.manyOrNone(
      `
      SELECT log_id, log_date, log_title, created_at, updated_at
      FROM
        logs JOIN logbooks on
        logs.logbook_id = logbooks.logbook_id
      WHERE logbookId = $1 AND user_id = $2
    `,
      [logbookId, userId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
