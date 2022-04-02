import pgPromise from 'pg-promise';
import { HttpInternal } from '../../utils/HttpErrors/HttpInternal';
import { db } from '../setup';

export interface Entry {
  entry_id: number;
  entry_time: Date;
  entry_text: string;
  entry_type: 'decision' | 'event';
  created_at: Date;
  updated_at: Date;
}

export interface Entries {
  decisions: Entry[];
  events: Entry[];
}

export const getAllEntries = async (
  logId: number,
  logbookId: number,
  userId: number
): Promise<Entries> => {
  try {
    const entries = await db.manyOrNone<Entry>(
      `
        SELECT
          entry_id, entry_time, entry_text,
          entry_type, created_at, updated_at
        FROM
          entries as e JOIN logs as l ON e.log_id = l.log_id
          JOIN logbooks as lb ON l.logbook_id = lb.logbook_id
        WHERE
          l.log_id = $1 AND lb.logbook_id = $2 AND lb.user_id = $3
      `,
      [logId, logbookId, userId]
    );

    const decisions = entries.filter(e => e.entry_type === 'decision');
    const events = entries.filter(e => e.entry_type === 'event');

    return {
      decisions,
      events,
    };
  } catch (err) {
    throw new HttpInternal();
  }
};

export const createEntries = async (
  entries: Array<Partial<Entry>>,
  logId: number,
  t: pgPromise.ITask<{}>
) => {
  return await t.batch(
    entries.map(e => {
      t.none(
        `
          INSERT INTO entries (entry_time, entry_text, entry_type, log_id)
          VALUES ($<entry_time>, $<entry_text>, $<entry_type>, $<logId>)
        `,
        {
          ...e,
          logId,
        }
      );
    })
  );
};
