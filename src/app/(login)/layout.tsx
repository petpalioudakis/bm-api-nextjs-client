import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Register Page',
  description: 'Applications login | register page',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={
        'flex min-h-screen flex-col items-center justify-center bg-gray-100 p-2'
      }
    >
      {children}
    </main>
  );
}
