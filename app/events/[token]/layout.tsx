import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event infos - FightConnect',
  description: 'Get all the information about the event and sign up to participate.',
};

export default function EventInfosLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
