import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Wiki Scholar',
  description: 'Understand wikipedia articles better with AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={` ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)]">
          <Navbar />
        </header>
        <div className="flex min-h-screen items-center justify-center">{children}</div>
      </body>
    </html>
  );
}
