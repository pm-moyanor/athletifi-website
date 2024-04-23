import Navbar from '@/components/dashboard/Navbar';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import AuthClient from '@/components/auth/AuthClient';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isSignedIn } = await isAuthenticated();
  return (
    <>
      <Navbar isSignedIn={isSignedIn} user={user} />
      {isSignedIn ? children : <AuthClient />}
    </>
  );
}
