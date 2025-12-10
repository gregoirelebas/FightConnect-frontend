import { Metadata } from 'next';
import Header from '@/app/...components/Header';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create an account to join FightConnect',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section><Header/>{children}</section>;
}
