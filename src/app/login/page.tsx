'use client';

import AuthClient from '@/components/auth/AuthClient';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/profile';

  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    window.localStorage.setItem('nextRedirect', redirectPath);
  }, []);

  useEffect(() => {
    if (route === 'authenticated') {
      router.push(redirectPath);
    }
  }, [route, redirectPath, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <AuthClient defaultScreen={''} />;
      </div>
    </div>
  );
};

export default LoginPage;
