'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';
import * as actions from '@/actions/user';

export default function Login() {
  const session = useSession();
  const [formState, action] = useFormState(actions.login, {
    message: '',
  });
  if (session?.data?.user) {
    redirect('/business');
  }

  return (
    <div
      className={
        'max-w-md m-auto mt-20 flex flex-col gap-4 rounded bg-white p-5 text-center shadow-lg'
      }
    >
      <h1 className={'pt-5 text-2xl font-bold text-gray-500'}>
        Business Staff Management
      </h1>
      <div className={'my-3'}>
        <form action={action}>
          <div className='mb-4 flex items-center'>
            <label
              htmlFor='username'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              name='username'
              className='w-2/3 rounded border p-3 transition hover:border-blue-500'
            />
          </div>
          <div className='mb-4 flex items-center'>
            <label
              htmlFor='password'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-2/3 rounded border p-3 transition hover:border-blue-500'
            />
          </div>
          {formState?.message && (
            <div className='my-2 rounded border border-red-400 bg-red-200 p-2'>
              {formState?.message}
            </div>
          )}
          <button className='m-5 mx-auto w-2/3 bg-gray-950 px-4 py-2 text-white transition-all hover:bg-gray-700'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
