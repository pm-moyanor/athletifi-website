'use client';
import { FC } from 'react';
import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';
import Footer from '@/components/common/Footer';
import Header from '@/components/user-portal/Header';
import Accordion from '@/components/user-portal/FAQ';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faFlag,
  faPaperPlane,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

interface HelpPageProps {}

const HelpPage: FC<HelpPageProps> = () => {
  return (
    <>
      <div className="overflow-hidden bg-gradient-to-r from-cardsDark2 to-cardsBackground w-full">
        <Navbar />
        <main className="mx-4 md:mx-20 my-32 md:my-36 lg:my-48 text-sm md:text-base flex flex-col justify-center">
          <Header pageTitle={'Help & Support'} />
          <div className="flex justify-center">
            <div className="flex flex-col mt-12 w-full justify-center max-w-[880px]">
              <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4">
                Frequently asked questions
              </h2>
              <div className="flex justify-center">
                <Accordion faqData={[]} />
              </div>
              <div className="h-px w-full bg-partnersBorders my-12"></div>
              <div>
                <p className="text-primary text-base mb-6">
                  Can’t find what you are looking for?
                </p>
                <div className="w-full flex justify-between bg-cardsDark py-2 px-6 rounded-10">
                  <div className="flex my-4">
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-skyblue mr-3"
                    />
                    <p className="text-primary text-base font-extralight">
                      Send an email
                    </p>
                  </div>
                  <div className="flex my-4">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="text-skyblue mr-3"
                    />
                    <p className="text-primary text-base font-extralight">
                      Chat with us
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-partnersBorders my-12"></div>
              <div className="">
                <div className="flex my-4">
                  {' '}
                  <FontAwesomeIcon
                    className="text-skyblue mr-3"
                    icon={faFlag}
                  />
                  <p className="text-primary text-base">Report a problem</p>
                </div>

                <div className="flex items-center cursor-pointer">
                  <div className="flex my-4">
                    <FontAwesomeIcon
                      className="text-skyblue mr-3"
                      icon={faCircleInfo}
                    />
                    <p className="text-primary text-base">Terms and Policies</p>
                  </div>
                </div>
              </div>
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
