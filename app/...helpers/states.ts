import { Role } from '../...types/enum';
import { Fighter } from '../...types/fighter';
import { Promoter } from '../...types/promoter';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setFighterState(fighter: any, callback: (value: Fighter) => void) {
  const data: Fighter = {
    name: fighter.userId.name,
    email: fighter.userId.email,
    password: fighter.userId.password,
    phoneNumber: fighter.userId.phoneNumber,
    bio: fighter.userId.bio,
    profilePicture: fighter.userId.profilePicture,
    role: Role.Fighter,
    sports: fighter.userId.sports,
    level: fighter.level,
    weight: fighter.weight,
    height: fighter.weight,
    licenceNumber: fighter.licenceNumber,
    victoryCount: fighter.victoryCount,
    defeatCount: fighter.defeatCount,
    drawCount: fighter.drawCount,
    lastFightDate: fighter.lastFightDate,
  };

  callback(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setPromoterState(promoter: any, callback: (value: Promoter) => void) {
  const data: Promoter = {
    name: promoter.userId.name,
    email: promoter.userId.email,
    password: promoter.userId.password,
    phoneNumber: promoter.userId.phoneNumber,
    bio: promoter.userId.bio,
    profilePicture: promoter.userId.profilePicture,
    role: Role.Promoter,
    sports: promoter.userId.sports,
    siret: promoter.siret,
    organizations: promoter.organizations,
  };

  callback(data);
}
