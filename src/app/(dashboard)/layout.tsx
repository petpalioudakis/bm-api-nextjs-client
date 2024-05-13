import Footer from '@/components/footer';
import Header from '@/components/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Staff Management Application',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className={'bg-gray-100 pb-4 pt-16 sm:pt-20'}
        style={{ minHeight: 'calc(100vh)' }}
      >
        <div className={'max-w-screen-xl mx-auto px-4 py-6'}>{children}</div>
      </main>
      <Footer />
    </>
  );
}
