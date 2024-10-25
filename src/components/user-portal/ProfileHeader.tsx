'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faXmark ,faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';
import PortalNav from './PortalNav';
import { motion, AnimatePresence } from 'framer-motion';
import { sourceSans3 } from '@/app/utils/helpers';
import { UserData } from '@/types/User.type';

export default function ProfileHeader({
  pageTitle,
  userData,
}: {
  pageTitle: string;
  userData: UserData;
}) {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);
  useEffect(() => {
    if (isOpenSideNav) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isOpenSideNav]);

  const sidebar = {
    open: (width = 1000) => ({
      clipPath: `circle(${width * 2 + 200}px at calc(100vw - 50px) 0px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(0px at 2px 2px)',
      transition: {
        // delay: 0.1,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={sourceSans3.className}
    >
      <AnimatePresence>
        {isOpenSideNav && (
          <motion.div
            variants={sidebar}
            animate={isOpenSideNav ? 'open' : 'closed'}
            exit={'closed'}
            className="h-full w-full z-10 fixed top-48 md:top-32 left-0 duration-500 transition-all bg-gradient-to-r from-cardsDark2 to-cardsBackground"
          >
            <PortalNav setIsOpenSideNav={setIsOpenSideNav} />
          </motion.div>
        )}
      </AnimatePresence>
    

      <div className="max-w-[1030px] mx-auto mb-[72px]">
        <div className='flex justify-between md:justify-end'>               
           {/* header submit footage CTA */}
        {pageTitle === "Coach Portal" &&    (  
  
      <Link href="/coach-profile/match-upload-form">
        <div className=" flex items-center text-skyblue text-sm md:text-md  max-w-[1030px] mx-auto pb-3 pr-2">
          <div className='border border-skyblue rounded-full p-[4px] w-12 h-12 flex justify-center align-middle ml-auto'> 
             <FontAwesomeIcon icon={faCloudArrowUp} className="my-auto" />
             </div>
        <p className='ml-2 text-primary'>Submit footage</p>
        
        </div>
      </Link>)}
        <div className="flex justify-between text-primary md:hidden pb-3 ml-auto">
          <p className="text-base font-extralight px-2 md:px-4">
            {userData.name}
          </p>
          <div className="flex items-center w-12 justify-between cursor-pointer mx-3">
            <Link href="/login">
              <FontAwesomeIcon icon={faUser} className="text-skyblue mr-3 " />
            </Link>

            <FontAwesomeIcon
              icon={isOpenSideNav ? faXmark : faGear}
              size={isOpenSideNav ? 'lg' : '1x'}
              className="text-skyblue mt-px"
              onClick={() => setIsOpenSideNav(!isOpenSideNav)}
            />
          </div>
        </div></div>
 
        <div className="flex h-px bg-partnersBorders"></div>
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ ease: 'easeOut', duration: 0.5 }}
          className="font-bold text-[48px] leading-10 md:leading-none md:text-[54px] text-white opacity-75 my-6"
        >
          {pageTitle}
        </motion.h1>
      </div>
    </motion.div>
  );
}
