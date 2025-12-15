import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up Fighter - FightConnect',
  description: 'Create an account to join FightConnect',
};

export default function SignupFighterLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
