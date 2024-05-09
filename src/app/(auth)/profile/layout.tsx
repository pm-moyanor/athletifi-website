import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { redirect } from 'next/navigation';

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = await isAuthenticated();
  if (!isSignedIn) redirect('/login?redirect=/profile');

  return <>{children}</>;
}
