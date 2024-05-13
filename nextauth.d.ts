// nextauth.d.ts
import { DefaultSession, User } from 'next-auth';
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: User;
    userId: number;
    username: string;
    accessToken: string;
  }

  interface User extends User {
    token: string;
    username: string;
  }
}
