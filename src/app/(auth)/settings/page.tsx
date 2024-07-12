import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';
import AccountDetails from '@/components/user-portal/AccountDetails';
import Notifications from '@/components/user-portal/Notifications';
import ManageReferrals from '@/components/user-portal/ManageReferrals';
import Header from '@/components/common/Header';
import ProfileHeader from '@/components/user-portal/ProfileHeader';
import { UserData } from '@/types/User.type';
import { getUserData } from '@/app/actions/userDataActions';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const { isSignedIn } = await isAuthenticated();
  const userData = await getUserData();

  if (!isSignedIn || !userData) redirect('/login?redirect=/settings');

  return (
    <>
      <Header userData={userData as UserData} />
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground ">
        <main className="mx-4 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
          <ProfileHeader
            pageTitle={'Settings'}
            userData={userData as UserData}
          />
          <div className="w-full lg:max-w-[880px] mx-auto gap-4">
            <AccountDetails userData={userData as UserData} />
            <Notifications userData={userData as UserData} />
            <ManageReferrals userData={userData as UserData} />
          </div>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
}
