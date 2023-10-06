import NextAuth, { ISODateString, Session } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from 'lib/mongodb';
import { JWT } from 'next-auth/jwt';

// TODO: normalize this types
type TCustomUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  followers?: number | null;
  verified?: boolean | null;
};

export type TCustomSession = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
  expires: string;
  username: string;
};
export interface ICustomSession extends Session {
  user?: TCustomUser;
  expires: ISODateString;
}

type TCustomSessionProps = {
  session: ICustomSession;
  user: TCustomUser;
  token: JWT;
  newSession: any;
  trigger: 'update';
};

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
          followers: profile.followers,
          verified: true
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      },
      profile(profile) {
        return {
          id: Buffer.from(profile.email).toString('base64'),
          name: profile.name,
          username: profile.given_name,
          email: profile.email,
          image: profile.picture,
          followers: 0,
          verified: profile.email_verified
        };
      }
    })
  ],
  callbacks: {
    async session({
      session,
      user
    }: TCustomSessionProps): Promise<ICustomSession> {
      if (!session) {
        throw new Error("Don't find session");
      }
      // Send properties to the client, like an access_token from a provider.
      //TODO verify this change
      session = {
        ...session,
        username: user.username
      } as unknown as ICustomSession;
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      console.log('🚀 ~ file: [...nextauth].ts:98 ~ signIn ~ account:', {
        account,
        profile,
        user,
        credentials
      });
      if (account?.provider === 'google') {
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    }
  }
});
