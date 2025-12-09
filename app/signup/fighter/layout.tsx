import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up - Fighter',
  description: 'Create an account to join FightConnect',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
