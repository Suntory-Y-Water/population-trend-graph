import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import type React from 'react';
import './globals.css';
import Footer from './Footer';
import Header from './Header';

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '人口変動可視化サービス',
  description:
    'お住まいの地域の総人口、年少人口、生産年齢人口、老年人口など幅広い人口構成をグラフで確認できます。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={notoSansJp.className}>
        <Header />
        <main className='mb-16 min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
