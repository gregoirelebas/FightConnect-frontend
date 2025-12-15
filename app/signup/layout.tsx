import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your FightConnect profile',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
