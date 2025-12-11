import { Level, Weight, Sport } from './enum';

export interface Event {
  level: Level;
  sports: Sport[];
  clubName: string;
  date : string;
  experience : string;
  weight: Weight;
  name: string;
  description: string;
  promoterId: string;
  fighters: string[]
}


