function DayToString(number: number): string {
  if (number < 10) return '0' + number.toString();
  else return number.toString();
}

export function DateToString(date: Date): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = DayToString(date.getUTCDate());
  const month = months[date.getUTCMonth()];
  const year = DayToString(date.getUTCFullYear());

  return `${day} ${month} ${year}`;
}
export function SortAscend(a: Date, b: Date) {
  return b.getTime() - a.getTime();
}

export function SortDescend(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}
