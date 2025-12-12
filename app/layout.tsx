import type { Metadata } from 'next';
import './globals.css';

import { UserProvider } from '@/app/...providers/userProvider';

export const metadata: Metadata = {
  title: 'FightConnect',
  description: 'Connect fighters and promoters worldwide',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
