import { DateTime } from 'luxon';

export const normalizeToDateString = (date: string | Date): string => {
  const dt =
    typeof date === 'string'
      ? DateTime.fromISO(date, { zone: 'Africa/Lagos' })
      : DateTime.fromJSDate(date, { zone: 'Africa/Lagos' });

  return dt.toFormat('yyyy-MM-dd');
};
