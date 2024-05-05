import Navbar from '@/components/dashboard/Navbar';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import AuthClient from '@/components/auth/AuthClient';
import { Provider } from 'jotai';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  return (
    <>
      <Provider>
        <Navbar />
        {isSignedIn ? children : <AuthClient defaultScreen="" />}
      </Provider>
    </>
  );
}
