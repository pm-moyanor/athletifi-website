'use client';

import AuthClient from '@/components/auth/AuthClient';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === 'authenticated') router.push(redirectPath || '/profile');
  }, [route, redirectPath, router]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
        <AuthClient />;
      </div>
    </div>
  );
};

export default LoginPage;
