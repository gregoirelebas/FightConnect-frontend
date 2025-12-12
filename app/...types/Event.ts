import { Level, Weight, Sport, Experience } from './enum';

export interface Event {
  level: Level;
  sport: Sport;
  clubName: string;
  date: string;
  experience: Experience;
  weight: Weight;
  name: string;
  description: string;
  promoterToken: string;
  fighters: string[];
  token: string;
}
