import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Providers from './providers';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | 예지의 블로그',
    default: '예지의 블로그',
  },
  description: '프론트엔드 개발과 관련된 다양한 지식과 경험을 공유하는 블로그입니다.',
  keywords: ['Next.js', '프론트엔드', '웹개발', '코딩', '프로그래밍', '리액트'],
  authors: [{ name: '유예지', url: 'https://github.com/yejiyu0915' }],
  creator: '유예지',
  publisher: '유예지',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            {/* Header 영역 */}
            <Header />
            {/* Main 영역 */}
            <main className="flex-1">{children}</main>

            {/* Footer 영역 */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
