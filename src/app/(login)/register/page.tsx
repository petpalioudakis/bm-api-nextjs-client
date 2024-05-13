'use client';
import { register } from '@/actions/user';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';

export default function Register() {
  const session = useSession();
  const [formState, action] = useFormState(register, {
    message: '',
  });

  if (session?.data?.user?.email) {
    redirect('/business');
  }

  return (
    <div
      className={
        'max-w-md m-auto mt-20 flex flex-col gap-4 rounded bg-white p-5 text-center shadow-lg'
      }
    >
      <h1 className={'pt-5 text-center text-2xl font-bold text-gray-900'}>
        Business Staff Management Registration
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
              htmlFor='firstName'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              First Name
            </label>
            <input
              type='text'
              id='firstName'
              name='first_name'
              className='w-2/3 rounded border p-3 transition hover:border-blue-500'
            />
          </div>
          <div className='mb-4 flex items-center'>
            <label
              htmlFor='lastName'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastName'
              name='last_name'
              className='w-2/3 rounded border p-3 transition hover:border-blue-500'
            />
          </div>
          <div className='mb-4 flex items-center'>
            <label
              htmlFor='email'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='text'
              id='email'
              name='email'
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
          <div className='mb-4 flex items-center'>
            <label
              htmlFor='passwordConfirmation'
              className='w-1/3 text-sm font-medium text-gray-700'
            >
              Repeat Password
            </label>
            <input
              type='password'
              id='passwordConfirmation'
              name='password_confirmation'
              className='w-2/3 rounded border p-3 transition hover:border-blue-500'
            />
          </div>
          {formState?.message && (
            <div className='my-2 rounded border border-red-400 bg-red-200 p-2'>
              {formState?.message}
            </div>
          )}
          <button className='m-5 mx-auto w-2/3 bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-700'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
