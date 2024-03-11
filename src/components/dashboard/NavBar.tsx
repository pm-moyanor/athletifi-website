'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PageLogo } from '../common/Icon';
import { MotionConfig, motion } from 'framer-motion';

const AnimatedHamburgerButton: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  console.log(open);
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={open ? 'open' : 'closed'}
        onClick={() => {
          console.log('clicked');
          setOpen(!open);
        }}
        className="relative h-16 w-16 hover:partnersBorders"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-3pixel w-10 bg-primary rounded-xl"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-3pixel w-10 bg-primary rounded-xl"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-3pixel w-5  bg-primary rounded-xl"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 10px)',
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)',
    },
  },
};

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  console.log(open);
  return (
    <header>
      <div id="nav_bar" className=" absolute w-full py-4">
        <div className="container max-w-none md:max-w-full xl:max-w-1130 2xl:max-w-1320 mx-auto px-4 md:px-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <PageLogo />
            </Link>
            <div
              onClick={() => console.log('click')}
              className="md:hidden z-50 -mr-2"
            >
              <AnimatedHamburgerButton setOpen={setOpen} open={open} />
            </div>

            <div
              className={
                open
                  ? `h-full w-full z-40 fixed top-0 right-0 duration-500 transition-all bg-blackBG min-h-screen`
                  : `md:relative fixed min-h-screen md:min-h-full -right-full md:left-0 duration-500 md:ml-0 md:mt-0 top-0`
              }
            >
              {/* NAV PAGE LINKS */}
              <ul
                className={` flex items-center gap-25 md:gap-16 flex-col md:flex-row h-full justify-center ${open ? 'text-lgl' : 'text-base'}`}
                role="navigation"
                aria-label="Main"
              >
                <li>
                  <Link
                    href="/"
                    className=" text-primary font-sourceSansPro opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto "
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className=" text-primary font-sourceSansPro opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news?page=1"
                    className="  text-primary font-sourceSansPro  opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto"
                  >
                    News
                  </Link>
                </li>

                <li>
                  <Link
                    href="/contact-us"
                    className=" text-primary font-sourceSansPro opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto"
                  >
                    Contact us
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/dashboard/vsa-23/1"
                    className="text-primary font-sourceSansPro hover:bg-skyblueopacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto"
                  >
                    Dashboard
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/contact-us"
                    className="ml-0 md:ml-4 py-2 px-5 border border-skyblue font-light text-primary text-sm font-sourceSansPro duration-300 hover:bg-skyblue hover:text-white md:inline-block"
                  >
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
