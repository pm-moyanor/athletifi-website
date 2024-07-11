import { getUserData } from '@/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
import { UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  if (!isSignedIn) redirect('/login?redirect=/settings');

  const userData = await getUserData();

  return (
    <>
      <Header userData={userData as UserData} />
      {children}
    </>
  );
}
