import { createServerRunner } from '@aws-amplify/adapter-nextjs';
// import config from '@/amplifyconfiguration.json';
// import awsExports from '@/aws-exports';
import config from '@/custom-aws-exports';
import { cookies } from 'next/headers';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth/server';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { AuthData } from '@/types/User.type';

export const cookieBasedClient = generateServerClientUsingCookies({
  config,
  cookies,
  authMode: 'userPool',
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async (): Promise<AuthData> =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        const userAttributes = await fetchUserAttributes(contextSpec);
        return {
          userId: user.userId,
          name: userAttributes.name,
          email: userAttributes.email,
          signInMethod: user.signInDetails ? 'email' : 'social',
          isSignedIn: !!user,
        } as AuthData;
      } catch (error) {
        return {
          userId: '',
          name: '',
          email: '',
          signInMethod: '',
          isSignedIn: false,
          error: error || '',
        } as AuthData;
      }
    },
  });
