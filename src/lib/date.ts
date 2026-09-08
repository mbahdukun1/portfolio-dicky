const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

export function parseMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, 1);
}

export function formatMonth(value: string): string {
  const date = parseMonth(value);
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}

export function monthsBetween(start: string, end: string | null): number {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : new Date();
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  return Math.max(months, 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (remainder > 0) parts.push(`${remainder} mo${remainder > 1 ? 's' : ''}`);

  return parts.join(' ') || '1 mo';
}

export function yearsSince(start: string): number {
  return Math.floor(monthsBetween(start, null) / 12);
}
