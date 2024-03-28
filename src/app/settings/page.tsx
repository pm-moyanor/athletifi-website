'use client';

import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';

import AccountDetails from '@/components/user-portal/AccountDetails';
import Notifications from '@/components/user-portal/Notifications';
import ManageReferrals from '@/components/user-portal/ManageReferrals';
import Header from '@/components/user-portal/Header';

const SettingsPage = () => {
  return (
    <>
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground font-sourceSansPro">
        <Navbar />
        <main className="mx-2 md:mx-20 my-32 md:my-36 lg:my-48 text-sm md:text-md">
          <Header pageTitle={'Settings'} />
          <AccountDetails />
          <Notifications />
          <ManageReferrals />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
};

export default SettingsPage;
