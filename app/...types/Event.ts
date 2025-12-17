import { Level, Weight, Sport, Experience, ApplicationStatus } from './enum';
import { Fighter } from './fighter';

export interface Application {
  fighter: Fighter;
  status: ApplicationStatus;
  date: string;
}

export interface Event {
  level: Level;
  sport: Sport;
  clubName: string;
  city: string;
  date: string;
  experience: Experience;
  weight: Weight;
  name: string;
  description: string;
  promoterToken: string;
  fighters: Application[];
  token: string;
}
