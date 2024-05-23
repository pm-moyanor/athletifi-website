import Navbar from '@/components/dashboard/Navbar';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import AuthClient from '@/components/auth/AuthClient';
import { Suspense } from 'react';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  return (
    <>
      <Navbar />

      {isSignedIn ? (
        children
      ) : (
        <Suspense>
          <AuthClient defaultScreen={''} />
        </Suspense>
      )}
    </>
  );
}
