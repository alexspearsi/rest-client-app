'use client';

import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main className="flex-1 bg-[antiquewhite]">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
