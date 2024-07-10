import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';

import AccountDetails from '@/components/user-portal/AccountDetails';
import Notifications from '@/components/user-portal/Notifications';
import ManageReferrals from '@/components/user-portal/ManageReferrals';
import Header from '@/components/user-portal/Header';
import { UserData } from '@/types/User.type';
import { getUserData } from '@/actions/userDataActions';

export default async function SettingsPage() {
  const userData = await getUserData();

  return (
    <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground ">
      <main className="mx-4 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
        <Header pageTitle={'Settings'} />
        <div className="w-full lg:max-w-[880px] mx-auto gap-4">
          <AccountDetails userData={userData as UserData} />
          <Notifications userData={userData as UserData} />
          <ManageReferrals userData={userData as UserData} />
        </div>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
}
