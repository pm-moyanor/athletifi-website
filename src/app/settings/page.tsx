'use client';

import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';

import AccountDetails from '@/components/user-portal/AccountDetails';
import Notifications from '@/components/user-portal/Notifications';
import ManageReferrals from '@/components/user-portal/ManageReferrals';
import Header from '@/components/user-portal/Header';
import { Source_Sans_3 } from 'next/font/google';
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const SettingsPage = () => {
  return (
    <div className={sourceSans3.className}>
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground ">
        <Navbar />
        <main className="mx-4 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
          <Header pageTitle={'Settings'} />
          <div className="w-full max-w-[880px] mx-auto">
            <AccountDetails />
            <Notifications />
            <ManageReferrals />
          </div>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;
