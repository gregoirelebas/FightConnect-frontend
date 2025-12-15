import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup - FightConnect',
  description:
    'Create your FightConnect account to join the community of fighters and enthusiasts.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
