import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create an account to join FightConnect',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
