import { JWT } from '@auth/core/jwt';
import NextAuth, { CredentialsSignin, Session } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid credentials';
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  // Configure one or more authentication providers
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 60 * 2, // 2 hours
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if user exists
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          }
        );
        if (response.ok) {
          user = await response.json();
        }

        if (!user) {
          throw new InvalidLoginError('User not found.');
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  trustHost: true,
  basePath: '/api/auth',
  callbacks: {
    async jwt({ token, account, user, profile }) {
      try {
        // Add access_token to the token right after signin
        if (user?.token) {
          token.access_token = user?.token;
        }
        if (user?.username) {
          token.username = user?.username;
        }

        return token;
      } catch (e: any) {
        console.log('jwt error', e.message);
        return token;
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.access_token as string;
      session.username = token.username as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AZURE_AD_CLIENT_SECRET,
});
