import { getCookie } from './cookies';

/**
 * Sets state by retrieving a cookie value and executing a callback if the cookie exists.
 * @param cookieName - The name of the cookie to retrieve.
 * @param callback - A function to execute with the cookie value if it exists.
 * @returns void
 */
export async function setCookieState(cookieName: string, callback: (value: string) => void) {
  const value = await getCookie(cookieName);
  if (value) {
    callback(value);
  }
}

export async function setNumericState(value: string, callback: (value: number) => void) {
  const numeric = value.replaceAll(/\D+/g, '');
  callback(Number(numeric));
}
