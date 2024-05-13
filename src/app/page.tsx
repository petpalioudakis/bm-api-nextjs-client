'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = useSession();
  if (session?.data?.user) {
    redirect('/business');
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <h2 className='mb-4 text-2xl font-bold'>
        Welcome to Business Staff Management!
      </h2>
      <div className='mt-4'>
        <Link
          href='/login'
          className='mr-4 inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700'
        >
          Start your journey by logging in
        </Link>
        <Link
          href='/register'
          className='inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700'
        >
          New here? Register and join us!
        </Link>
      </div>
    </main>
  );
}
