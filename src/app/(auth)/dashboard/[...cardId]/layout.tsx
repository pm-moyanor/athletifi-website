import { getUserData } from '@/actions/userDataActions';
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
  if (!isSignedIn)
    redirect(`/login?redirect=/dashboard/${params.cardId.join('/')}`);

  const userData = await getUserData();

  return (
    <>
      <Header userData={userData as UserData} />
      {children}
    </>
  );
}
