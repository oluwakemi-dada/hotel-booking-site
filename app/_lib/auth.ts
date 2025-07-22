import NextAuth, { Session } from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({
      auth,
    }: {
      auth: {
        user?: { name?: string | null; email?: string | null } | null;
      } | null;
    }) {
      return !!auth?.user;
    },
    async signIn({
      user,
    }: {
      user: {
        name?: string | null;
        email?: string | null;
      };
    }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({
      session,
    }: {
      session: Session & {
        user: {
          name?: string | null;
          email?: string | null;
          guestId?: string;
        };
      };
    }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
