'use client';
import 'src/styles/AuthStyles.css';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { ComponentOverrides, FormFieldsOverrides } from './AuthOverrides';
// import { signUp, type SignUpInput } from 'aws-amplify/auth';
import { loginTheme, sourceSans3 } from './AuthTheme';
import { useSearchParams } from 'next/navigation';
// import { useAuthenticator } from '@aws-amplify/ui-react';
// import handleFetchUserAttributes from '@/app/utils/auth/handleFetchUserAttributes';
// import handlePostSignIn from '@/app/utils/auth/handlePostSignIn';
import { inviteIdAtom } from '@/states/userStore';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { SignUpInput, SignUpOutput, signUp } from 'aws-amplify/auth';
import handleFetchUserAttributes from '@/app/utils/auth/handleFetchUserAttributes';
import handlePostSignIn from '@/app/utils/auth/handlePostSignIn';

const AuthClient = ({ defaultScreen }: { defaultScreen: string }) => {
  const searchParams = useSearchParams();
  const inviteId = searchParams.get('invite_id') || null;
  const oauthCode = searchParams.get('code');

  const setInviteId = useSetAtom(inviteIdAtom);

  useEffect(() => {
    setInviteId(inviteId);
  }, [inviteId, setInviteId]);

  console.log('inviteId: ', inviteId);
  console.log('oauthCode: ', oauthCode);
  // const { route } = useAuthenticator((context) => [context.route]);
  // console.log(route);
  // if (route === 'authenticated') {
  // if (route === 'authenticated') {
  // if (oauthCode || route === 'authenticated') {
  // Call Louis' function to send user data to the backend
  // handleFetchUserAttributes().then((user) => {
  //   console.log('user:');
  //   console.log(user);
  //   handlePostSignIn(user, inviteId);
  // });
  // redirect to the profile page
  //}
  // const { tokens } = useTheme();
  // console.log(tokens);
  // const baseURL =
  //   process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
  // const postHelper = async (
  //   email: string | undefined,
  //   name: string | undefined,
  //   amplify_id: string | undefined,
  // ) => {
  //   const response = await fetch(
  //     `${baseURL}/addUser?email=${email}&name=${name}&amplify_id=${amplify_id}`,
  //   );
  //   const data = await response.json();
  //   return data;
  // };

  // const services = {
  //   async handleSignUp(formData: SignUpInput) {
  //     const result = await signUp(formData);

  //     try {
  //       if (formData?.options?.userAttributes) {
  //         const attributes = formData.options.userAttributes;
  //         await postHelper(attributes.email, attributes.name, result.userId);
  //       }
  //     } catch (err) {
  //       console.log('Ran into a problem with storing user data', err);
  //     }

  //     return new Promise<SignUpOutput>((resolve) => {
  //       resolve(result);
  //     });
  //   },
  // };

  const services = {
    async handleSignUp(formData: SignUpInput) {
      try {
        const result = await signUp(formData);
        handleFetchUserAttributes().then((user) => {
          handlePostSignIn(user, inviteId);
        });
        return new Promise<SignUpOutput>((resolve) => {
          resolve(result);
        });
      } catch (error) {
        console.error('Error signing up:', error);
        throw error;
      }
    },
  };
  return (
    <div
      className={`bg-cardsDark ${sourceSans3.className} md:p-8 shadow-sm flex justify-center`}
    >
      <ThemeProvider theme={loginTheme}>
        <div className="mb-12">
          <p className="text-primary font-extralight leading-8 mt-28">
            Welcome to
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
          socialProviders={['google', 'facebook']}
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
