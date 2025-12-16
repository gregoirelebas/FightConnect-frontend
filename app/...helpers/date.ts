function numberToString(number: number): string {
  if (number < 10) return '0' + number.toString();
  else return number.toString();
}

export function dateToString(dateString: string): string {
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

  const date = new Date(dateString);

  const day = numberToString(date.getUTCDate());
  const month = months[date.getUTCMonth()];
  const year = numberToString(date.getUTCFullYear());

  return `${day} ${month} ${year}`;
}

export function getFormatedDate(dateString: string) {
  const date = new Date(dateString);

  const day = numberToString(date.getUTCDate());
  const month = numberToString(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

export function sortAscend(a: string, b: string) {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function sortDescend(a: string, b: string) {
  return new Date(a).getTime() - new Date(b).getTime();
}
