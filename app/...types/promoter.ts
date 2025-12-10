import { Role, Sport } from './enum';

export interface Organization {
  name: string;
  date: Date;
}

export interface Promoter {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string;
  role: Role;
  sport: Sport;
  siretNumber: string;
  organizations: Organization[];
}
