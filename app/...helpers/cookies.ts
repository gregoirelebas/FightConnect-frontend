'use server';

import { cookies as headersCookies } from 'next/headers';

/**
 * Sets a cookie with the specified key and value.
 *
 * @param key - The name of the cookie to set.
 * @param value - The value to assign to the cookie.
 * @returns A promise that resolves when the cookie has been set.
 */
export async function setCookie(key: string, value: string) {
  const cookieStore = await headersCookies();

  cookieStore.set(key, value);
}

/**
 * Sets multiple cookies in the cookie store.
 *
 * @param cookies - An array of tuples, where each tuple contains the cookie key and value as strings.
 *
 * @example
 * ```typescript
 * await setCookies([['token', 'abc123'], ['theme', 'dark']]);
 * ```
 */
export async function setCookies(cookies: [key: string, value: string][]) {
  const cookieStore = await headersCookies();

  cookies.forEach((cookie) => {
    cookieStore.set(cookie[0], cookie[1]);
  });
}

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns A promise that resolves to the cookie value if found, otherwise `undefined`.
 */
export async function getCookie(name: string) {
  const cookieStore = await headersCookies();

  return cookieStore.get(name)?.value;
}

/**
 * Retrieves the values of specified cookies from the current request headers.
 *
 * @param names - An array of cookie names to retrieve.
 * @returns A promise that resolves to an array of cookie values corresponding to the provided names.
 *          If a cookie is not found, its value will be `undefined` in the resulting array.
 */
export async function getCookies(names: string[]) {
  const cookieStore = await headersCookies();

  return names.map((name) => {
    return cookieStore.get(name)?.value;
  });
}

/**
 * Deletes a cookie by its name from the current cookie store.
 *
 * @param name - The name of the cookie to delete.
 * @returns A promise that resolves when the cookie has been deleted.
 */
export async function deleteCookie(name: string) {
  const cookieStore = await headersCookies();

  cookieStore.delete(name);
}

/**
 * Deletes the specified cookies from the cookie store.
 *
 * @param names - An array of cookie names to be deleted.
 * @returns A promise that resolves when the cookies have been deleted.
 */
export async function deleteCookies(names: string[]) {
  const cookieStore = await headersCookies();

  names.forEach((name) => {
    cookieStore.delete(name);
  });
}

/**
 * Clears all cookies from the cookie store.
 *
 * Retrieves all cookies from the header's cookie store and deletes each one individually.
 *
 * @async
 * @returns {Promise<void>}
 */
export async function clearCookies() {
  const cookieStore = await headersCookies();

  const allCookies = cookieStore.getAll();
  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
}
