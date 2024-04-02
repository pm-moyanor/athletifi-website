import { FC, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faUser,
  faChevronUp,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import PortalNav from './PortalNav';
import { motion, AnimatePresence } from 'framer-motion';

const dummyDataUser = {
  name: 'Daniel Carrillo',
};

interface HeaderProps {
  pageTitle: string;
}

const Header: FC<HeaderProps> = ({ pageTitle }) => {
  const [user] = useState(dummyDataUser);
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpenSideNav && (
          <motion.div
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '100vh', overflow: 'auto' }}
            exit={{ opacity: 0, maxHeight: 0, overflow: 'hidden' }}
            transition={{
              duration: 0.08,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="h-full w-full z-20 fixed top-48 md:top-32 left-0 duration-500 transition-all bg-gradient-to-r from-cardsDark2 to-cardsBackground"
          >
            <PortalNav />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="max-w-[1030px] mx-auto mb-[72px]">
        <div className="flex justify-between text-primary md:hidden pb-3">
          <p className="text-base font-extralight px-2 md:px-4">{user.name}</p>
          <div className="flex items-center w-12 justify-between cursor-pointer mx-3">
            <Link href="/profile">
              <FontAwesomeIcon icon={faUser} className="text-skyblue mr-3" />
            </Link>

            <FontAwesomeIcon
              icon={faGear}
              className="text-skyblue"
              onClick={() => setIsOpenSideNav(!isOpenSideNav)}
            />
          </div>
        </div>
        <div className="flex h-px bg-partnersBorders"></div>
        <h1 className="font-bold text-[48px] md:text-[54px] text-white opacity-75 my-12">
          {pageTitle}
        </h1>
      </div>
    </>
  );
};

export default Header;
