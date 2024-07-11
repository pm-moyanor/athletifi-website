import { getUserData } from '@/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import Header from '@/components/common/Header';
import Preloader from '@/components/common/Preloader';
import ProfileMain from '@/components/user-portal/ProfileMain';
import { UserData } from '@/types/User.type';
import { redirect } from 'next/navigation';

export default async function Profile() {
  const { isSignedIn } = await isAuthenticated();
  const userData = await getUserData();

  if (!isSignedIn || !userData) redirect('/login?redirect=/profile');

  return (
    <>
      <Preloader />
      <Header userData={userData as UserData} />
      <ProfileMain userData={userData as UserData} />
    </>
  );
}
