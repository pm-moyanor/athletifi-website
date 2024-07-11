import { getUserData } from '@/actions/userDataActions';
import Preloader from '@/components/common/Preloader';
import ProfileMain from '@/components/user-portal/ProfileMain';
import { UserData } from '@/types/User.type';

export default async function Profile() {
  const userData = await getUserData();

  return (
    <>
      <Preloader />
      <ProfileMain userData={userData as UserData} />
    </>
  );
}
