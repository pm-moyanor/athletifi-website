import { getUserData } from '@/app/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
import { UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cardId: string[] };
}) {
  const { isSignedIn } = await isAuthenticated();
  const userData = await getUserData();

  if (!isSignedIn || !userData)
    redirect(`/login?redirect=/dashboard/${params.cardId.join('/')}`);

  return (
    <>
      <Header userData={userData as UserData} />
      {children}
    </>
  );
}
