export function toJalaliYMD(
  input: string | Date,
  opts?: { timeZone?: string }
): string {
  const date = typeof input === 'string' ? new Date(input) : input;

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const fmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    timeZone: opts?.timeZone ?? 'Asia/Tehran',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = fmt.formatToParts(date);
  const y = parts.find((p) => p.type === 'year')?.value ?? '';
  const m = parts.find((p) => p.type === 'month')?.value ?? '';
  const d = parts.find((p) => p.type === 'day')?.value ?? '';

  return `${y}/${m}/${d}`; // مثل: ۱۴۰۴/۰۵/۰۴
}
