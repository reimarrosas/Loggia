import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export const getAllDecisions = async (logId: number) => {
  try {
    await db.manyOrNone(
      `
        SELECT *
        FROM decisions
        WHERE log_id = $1
    `,
      [logId]
    );
  } catch (err) {
    throw new HttpInternal();
  }
};
