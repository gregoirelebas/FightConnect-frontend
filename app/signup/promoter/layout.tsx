import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up - Promoter',
  description: 'Create an account to join FightConnect',
};

export default function SignupPromoterLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
