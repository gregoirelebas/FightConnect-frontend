import { Metadata } from 'next';
import Header from '@/app/...UI/Header';

export const metadata: Metadata = {
  title: 'Events',
  description: 'View all the Events and search with filter',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <section><Header/>{children}</section>;
}
