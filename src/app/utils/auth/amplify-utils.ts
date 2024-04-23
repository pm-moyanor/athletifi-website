import { createServerRunner } from '@aws-amplify/adapter-nextjs';
import config from '@/amplifyconfiguration.json';
import { cookies } from 'next/headers';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';

export const cookieBasedClient = generateServerClientUsingCookies({
  config,
  cookies,
  authMode: 'userPool',
});

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const isAuthenticated = async () =>
  await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    async operation(contextSpec) {
      try {
        const user = await getCurrentUser(contextSpec);
        return {
          user: JSON.stringify(user.signInDetails?.loginId || user.username),
          isSignedIn: !!user,
        };
      } catch (error) {
        return {
          user: '',
          isSignedIn: false,
        };
      }
    },
  });
