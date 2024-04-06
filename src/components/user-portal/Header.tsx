import { FC, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import PortalNav from './PortalNav';

const dummyDataUser = {
  name: 'Daniel Carrillo',
};

interface HeaderProps {
  pageTitle: string;
}

const Header: FC<HeaderProps> = ({ pageTitle }) => {
  const [user] = useState(dummyDataUser);
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);

  useEffect(() => {
    if (isOpenSideNav) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isOpenSideNav]);

  return (
    <>
      <div
        className={
          isOpenSideNav
            ? 'h-full w-full z-10 fixed top-40 left-0 duration-500 transition-all bg-gradient-to-r from-cardsDark2 to-cardsBackground min-h-screen'
            : 'fixed min-h-screen -left-full'
        }
      >
        <PortalNav setIsOpenSideNav={setIsOpenSideNav} />
      </div>
      <div className="flex justify-end text-offwhite md:hidden pb-3">
        <div
          className="flex items-center cursor-pointer mx-3"
          onClick={() => setIsOpenSideNav(!isOpenSideNav)}
        >
          {!isOpenSideNav ? (
            <>
              <p className="text-md px-2 md:px-4">{user.name}</p>
              <FontAwesomeIcon icon={faChevronDown} />
            </>
          ) : (
            <FontAwesomeIcon icon={faXmark} size="lg" />
          )}
        </div>
      </div>
      <div className="flex border-t border-t-offwhite opacity-50"></div>
      <h1 className="font-bold text-4xl md:text-6xl text-white opacity-75 my-5">
        {pageTitle}
      </h1>
    </>
  );
};

export default Header;
