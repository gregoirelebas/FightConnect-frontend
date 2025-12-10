import { Level, Role, Sport } from './enum';

export interface Fighter {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string;
  role: Role;
  sports: Sport[];
  level: Level;
  weight: number;
  height: number;
  licenceNumber: string;
  victoryCount: number;
  defeatCount: number;
  drawCount: number;
  lastFightDate: string;
}
