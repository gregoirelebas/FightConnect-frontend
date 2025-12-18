function numberToString(number: number): string {
  if (number < 10) return '0' + number.toString();
  else return number.toString();
}

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

export function dateToString(dateString: string): string {
  const date = new Date(dateString);

  const day = numberToString(date.getUTCDate());
  const month = months[date.getUTCMonth()];
  const year = numberToString(date.getUTCFullYear());

  return `${day} ${month} ${year}`;
}

export function monthToString(month: number) {
  return months[month];
}

export function isSameDate(a: Date, b: Date) {
  return (
    a.getUTCDate() == b.getUTCDate() &&
    a.getUTCMonth() == b.getUTCMonth() &&
    a.getUTCFullYear() == b.getUTCFullYear()
  );
}

export function getFormatedDate(dateString: string) {
  const date = new Date(dateString);

  const day = numberToString(date.getUTCDate());
  const month = numberToString(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export function getCalendarDate(date: Date) {
  const day = numberToString(date.getDate());
  const month = numberToString(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function sortAscend(a: string, b: string) {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function sortDescend(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}

export function getWeekDay(locale: string | undefined, date: Date) {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return days[date.getDay()];
}
