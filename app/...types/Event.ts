import { Level, MaxWeight, MinWeight, Sport } from './enum';

export interface Event {
  level: Level;
  sports: Sport[];
  clubName: string;
  date : string;
  experience : string;
  minWeight: MinWeight;
  maxWeight: MaxWeight;
  name: string;
  description: string;
  promoterId: string;
  fighters: string[]
}


