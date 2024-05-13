'use server';
import { InvalidLoginError } from '@/utils/auth';
import * as auth from '@/utils/auth';
import { redirect } from 'next/navigation';

export async function register(
  formState: { message: string },
  formData: FormData
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    if (response.ok && response.status === 201) {
      await auth.signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
        callbackUrl: '/business',
      });
    } else {
      const error = await response.text();
      return {
        message: error.toString() || 'Something went wrong...',
      };
    }
  } catch (err) {
    if (err instanceof InvalidLoginError) {
      return {
        message: err?.code,
      };
    } else {
      // @ts-ignore
      if (err?.message === 'NEXT_REDIRECT') {
        redirect('/business');
      } else {
        return {
          message: 'Something went wrong...',
        };
      }
    }
  }

  redirect('/business');
}

export async function login(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const username = formData.get('username');
    const password = formData.get('password');

    if (typeof username !== 'string' || username.length < 3) {
      return {
        message: 'Username must be longer',
      };
    }
    if (typeof password !== 'string' || password.length < 8) {
      return {
        message: 'Password must be longer',
      };
    }

    // Create a new record in the database
    await auth.signIn('credentials', {
      ...Object.fromEntries(formData.entries()),
      callbackUrl: '/business',
    });
  } catch (err: unknown) {
    if (err instanceof InvalidLoginError) {
      return {
        message: err?.code,
      };
    } else {
      // @ts-ignore
      if (err?.message === 'NEXT_REDIRECT') {
        redirect('/business');
      } else {
        return {
          message: 'Something went wrong...',
        };
      }
    }
  }

  redirect('/business');
}

export async function logout() {
  try {
    await auth.signOut();
    // Next redirect throws an error so we need to catch it
    redirect('/login');
  } catch (e) {
    console.log('logout', e);
  }
}
