import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import type React from 'react';
import './globals.css';
import Favicon from '/public/icon.svg';
import Footer from './Footer';
import Header from './Header';

const notoSansJp = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://population-trend-graph.pages.dev/'),
  title: '人口変動ナビ',
  description:
    'お住まいの地域の総人口、年少人口、生産年齢人口、老年人口など幅広い人口データをグラフで比較・閲覧できるウェブサービスです。',
  openGraph: {
    title: '人口変動ナビ',
    url: 'https://population-trend-graph.pages.dev/',
    type: 'website',
    description:
      'お住まいの地域の総人口、年少人口、生産年齢人口、老年人口など幅広い人口データをグラフで比較・閲覧できるウェブサービスです。',
    images: '/opengraph-image.png',
    siteName: '人口変動ナビ',
  },
  twitter: {
    title: '人口変動ナビ',
    description:
      'お住まいの地域の総人口、年少人口、生産年齢人口、老年人口など幅広い人口データをグラフで比較・閲覧できるウェブサービスです。',
    card: 'summary_large_image',
    images: '/opengraph-image.png',
  },
  icons: [{ rel: 'icon', url: Favicon.src }],
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
