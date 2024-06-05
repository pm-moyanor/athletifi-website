'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  // ArrowButton,
  // FacebookIcon,
  // LinkedInIcon,
  // TikTokIcon,
  // TwitterIcon,
  PageLogo,
} from './Icon';
//import SocialPopUp from './SocialPopUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
//import Image from 'next/image';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Hub } from 'aws-amplify/utils';

import { useUserData } from '@/states/userStore';

const SCROLL_THRESHOLD: number = 200;

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdown = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { userData, resetUserDataState, setIsLoggedIn } = useUserData();

  useEffect(() => {
    const hubListenerCancel = Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          // Redirect user to initialize notification preferences upon first login
          setIsLoggedIn(true);
          startTransition(() => router.refresh());
          break;
        case 'signedOut':
          setIsLoggedIn(false);
          startTransition(() => router.push('/logout'));
          startTransition(() => router.refresh());
          break;
      }
    });

    return () => hubListenerCancel();
  }, [router, setIsLoggedIn]);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return;
    function handleOutSideClick(event: MouseEvent) {
      if (!dropdown.current?.contains(event.target as Node)) {
        setShowDropdown(false);
        event.stopPropagation();
      }
    }
    window.addEventListener('mouseup', handleOutSideClick);
    // clean up
    return () => window.removeEventListener('mouseup', handleOutSideClick);
  }, [showDropdown]);

  const handleSignOutSignIn = async () => {
    if (userData.data === null) {
      router.push('/login');
    } else {
      resetUserDataState();
      await signOut();
    }
  };

  useEffect(() => {
    // Set the path state to the current pathname on the client side
    setPath(window.location.pathname);

    const handleBodyOverflow = () => {
      if (open) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    if (typeof window !== 'undefined') {
      handleBodyOverflow();
    }

    return () => {
      // Clean up to remove class when component unmounts or path changes
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  // ==============================================
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    let prevScrollPos: number = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos: number = window.scrollY;
      setScrollPosition(currentScrollPos);
      const isVisible: boolean = prevScrollPos > currentScrollPos;
      setIsVisible(isVisible);
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // ====================================================== nav-social-icon
  // const [navSocialIcon, setNavSocialIcon] = useState<boolean>(true);
  // const socialIcon = (): void => {
  //   setOpen(false);
  //   setNavSocialIcon(!navSocialIcon);
  // };
  // const socialIconDropDown = () => {
  //   setNavSocialIcon(!navSocialIcon);
  // };

  const linksStyle = `opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto`;

  return (
    <header>
      <div
        ref={navbarRef}
        id="nav_bar"
        className={`navbar fixed top-0 black w-full bg-bgnav py-4 z-50 ${
          scrollPosition > SCROLL_THRESHOLD
            ? 'header--slide-up'
            : 'header--slide-down'
        } ${isVisible ? 'header--slide-down' : 'header--slide-up'}`}
      >
        <div className="container max-w-full">
          <div className="flex items-center justify-between mx-4">
            <Link href="/">
              <PageLogo />
              {/* <Image
                src="/athletifi-logo-web.svg"
                width="75"
                height="64"
                className="w-[65px] sm:w-[75px]"
                alt={''}
              /> */}
            </Link>
            {/* SMALL SCREEN MENU ICONS */}
            <div
              onClick={() => setOpen(!open)}
              className="flex flex-col md:hidden bg-transparent border-0 relative z-50 cursor-pointer"
            >
              <span className="h-3pixel w-35 bg-white inline-block rounded-sm"></span>
              <span className="my-2 h-3pixel w-7 bg-white inline-block rounded-sm"></span>
              <span className="h-3pixel w-35 bg-white inline-block rounded-sm"></span>
            </div>
            <div
              className={
                open
                  ? 'header__nav--open h-full w-full z-20 fixed top-0 left-0 duration-500 transition-all bg-blackBG min-h-screen'
                  : 'header__nav--open md:relative fixed min-h-screen md:min-h-full -left-full md:left-0 duration-500 md:ml-0 md:mt-0 z-40 top-0'
              }
            >
              {/* NAV PAGE LINKS */}
              <ul
                className="flex items-center gap-25 md:gap-40pixel flex-col md:flex-row h-full justify-center"
                role="navigation"
                aria-label="Main"
              >
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/' ? '!opacity-100' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/about-us"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/about-us' ? '!opacity-100 ' : ''
                    }`}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/news?page=1"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/news' ? '!opacity-100' : ''
                    }`}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    onClick={() => setOpen(false)}
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/contact-us' ? '!opacity-100' : ''
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
                <div className="border-t border-t-partnersBorders opacity-75 w-1/3 md:hidden"></div>
                {userData.data === null ? (
                  <div className="flex flex-col items-center gap-2 md:hidden mt-6 md:mt-0">
                    <Link href="/login">
                      <button className="text-primary w-[100px] h-8 text-sm border border-offwhite rounded-full font-extralight hover:bg-skyblue hover:border-skyblue transform hover:scale-95 ease-in-out">
                        Log in
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="text-darkgray w-[100px] h-8 bg-skyblue text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out">
                        Sign up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-25 items-center text-primary md:hidden mt-2 md:mt-0 w-full">
                    <Link href="/profile" className={`${linksStyle}`}>
                      My cards
                    </Link>
                    <Link href="/settings" className={`${linksStyle}`}>
                      Settings
                    </Link>
                    <Link href="/help-support" className={`${linksStyle}`}>
                      Help & Support
                    </Link>
                    <div className="border-t border-t-partnersBorders opacity-80 w-1/3"></div>
                    <div
                      className={`${linksStyle}  cursor-pointer`}
                      onClick={handleSignOutSignIn}
                    >
                      Logout
                    </div>
                  </div>
                )}
                {userData.data === null ? (
                  <div className="flex items-center gap-2 md:ml-4 mt-6 md:mt-0 hidden md:flex">
                    <Link href="/login">
                      <button className="text-primary w-[100px] h-8 text-sm border border-offwhite rounded-full font-extralight hover:bg-skyblue hover:border-skyblue transform hover:scale-95 ease-in-out">
                        Log in
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="text-darkgray w-[100px] h-8 bg-skyblue text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out">
                        Sign up
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="hidden relative md:flex items-center text-primary">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      <p className="text-base px-2 ">{userData.data?.name}</p>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    {showDropdown && (
                      <div
                        ref={dropdown}
                        className="absolute flex flex-col justify-between w-48 h-60 top-8 right-px  bg-cardsDark rounded px-4 py-8"
                      >
                        <Link
                          href="/profile"
                          className={`${linksStyle} mr-auto`}
                        >
                          My cards
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setShowDropdown(!showDropdown)}
                          className={`${linksStyle} mr-auto`}
                        >
                          Settings
                        </Link>
                        <Link
                          href="/help-support"
                          className={`${linksStyle} mr-auto`}
                        >
                          Help & Support
                        </Link>
                        <div className="border-t border-t-offwhite opacity-75"></div>
                        <div
                          className={`${linksStyle} mr-auto cursor-pointer`}
                          onClick={handleSignOutSignIn}
                        >
                          Logout
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
