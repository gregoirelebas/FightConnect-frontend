import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Event',
  description: 'Create a new Event',
};

export default function CreateEventLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
