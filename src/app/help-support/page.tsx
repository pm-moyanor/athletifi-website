'use client';
import { FC } from 'react';
import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';
import Header from '@/components/user-portal/Header';
import Accordion from '@/components/user-portal/FAQ';

interface HelpPageProps {}

const HelpPage: FC<HelpPageProps> = () => {
  return (
    <>
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground">
        <Navbar />
        <main className="mx-2 md:mx-20 my-32 md:my-36 lg:my-48 text-sm md:text-md">
          <Header pageTitle={'Help & Support'} />
          <div className="flex flex-col mt-12">
            <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4">
              Frequently asked questions
            </h2>
            <div className="flex justify-center">
              <Accordion faqData={[]} />
            </div>
          </div>
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
};

export default HelpPage;
