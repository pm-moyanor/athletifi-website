import AuthClient from '@/components/auth/AuthClient';
import Header from '@/components/common/Header';
import { Suspense } from 'react';

const LoginPage = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          <Suspense>
            <AuthClient defaultScreen={''} redirect={searchParams?.redirect} />;
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
