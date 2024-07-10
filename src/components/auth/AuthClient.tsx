'use client';

import 'src/styles/AuthStyles.css';
import {
  Authenticator,
  ThemeProvider,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';
import { loginTheme } from './AuthTheme';
import { useSearchParams } from 'next/navigation';
import { inviteIdAtom } from '@/states/userStore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpInput, fetchUserAttributes, signUp } from 'aws-amplify/auth';
import handlePostSignIn from '@/app/utils/auth/handlePostSignIn';
import { sourceSans3 } from '@/app/utils/helpers';

const AuthClient = ({
  defaultScreen,
  redirect,
}: {
  defaultScreen: string;
  redirect: string | undefined;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inviteId, setInviteId] = useAtom(inviteIdAtom);

  useEffect(() => {
    const storedInviteId = searchParams.get('invite_id');

    if (storedInviteId) {
      setInviteId(storedInviteId);
    }
  }, [searchParams, setInviteId]);
  const { user, route } = useAuthenticator((context) => [
    context.user,
    context.route,
  ]);

  useEffect(() => {
    if (route === 'authenticated') {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/profile');
      }
    }
  }, [route, redirect, router]);

  const services = {
    async handleSignUp(formData: SignUpInput) {
      try {
        const result = await signUp(formData);
        // SignUp is successful, but user is not authenticated yet.
        // Do not fetch attributes or call post sign-in here.
        return result; // Just return the result indicating successful sign-up.
      } catch (error) {
        console.error('Error signing up:', error);
        throw error;
      }
    },
  };

  // Listen for the sign-in event after user verifies their email and signs in
  useEffect(() => {
    if (user && route === 'authenticated') {
      fetchUserAttributes()
        .then((userAttributes) => {
          handlePostSignIn(userAttributes, inviteId).catch((err) => {
            console.error('Error in post sign-in:', err);
          });
        })
        .catch((err) => {
          console.error('Error fetching user attributes:', err);
        });
    }
  }, [route, inviteId, user]);

  return (
    <div
      className={`bg-cardsDark ${sourceSans3.className} p-4 md:p-8 shadow-sm flex justify-center rounded-10 mt-16`}
    >
      <ThemeProvider theme={loginTheme}>
        <div className="mb-12">
          <p className="text-primary font-extralight leading-8 mt-12">
            Signup for
          </p>
          <h1
            className={`text-xl text-primary leading-8 ${sourceSans3.className}`}
          >
            AthletiFi
          </h1>
        </div>

        <Authenticator
          services={services}
          components={ComponentOverrides}
          formFields={FormFieldsOverrides}
          initialState={
            defaultScreen as 'signIn' | 'signUp' | 'forgotPassword' | undefined
          }
          // services={services}
        />
      </ThemeProvider>
    </div>
  );
};

export default AuthClient;
