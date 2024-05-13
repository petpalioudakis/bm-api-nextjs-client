'use client';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  return <div className='text-center text-lg'>{error.message}</div>;
}
