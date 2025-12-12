import { Role, Sport } from './enum';

export interface Organization {
  name: string;
  date: string;
}

export interface Promoter {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  profilePicture: string;
  role: Role;
  sports: Sport[]; //Declared as an array but expect only one in sign up
  siret: string;
  organizations: Organization[];
}
