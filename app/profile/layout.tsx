import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - FightConnect',
  description: 'View and manage your FightConnect profile.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
