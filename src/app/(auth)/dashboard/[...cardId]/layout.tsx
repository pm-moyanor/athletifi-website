import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
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

  return (
    <>
      <Header />
      {children}
    </>
  );
}
