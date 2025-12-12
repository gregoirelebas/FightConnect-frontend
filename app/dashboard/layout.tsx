import { Metadata } from 'next';
import Header from '@/app/...UI/Header';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View of the dashboard with the Events',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
