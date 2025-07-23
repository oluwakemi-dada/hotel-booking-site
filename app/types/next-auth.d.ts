import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      guestId?: string;
    } & DefaultSession['user'];
  }

  interface User {
    guestId?: string;
  }
}
