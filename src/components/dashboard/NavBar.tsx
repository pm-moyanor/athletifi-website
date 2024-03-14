'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageLogo } from '../common/Icon';
//import { MotionConfig, motion } from 'framer-motion';

//----------------animated button-----------------
// const AnimatedHamburgerButton: React.FC<{
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }> = ({ open, setOpen }) => {
//   return (
//     <MotionConfig
//       transition={{
//         duration: 0.5,
//         ease: 'easeInOut',
//       }}
//     >
//       <motion.button
//         initial={false}
//         animate={open ? 'open' : 'closed'}
//         onClick={() => {
//           console.log('clicked');
//           setOpen(!open);
//         }}
//         className="relative h-16 w-16 hover:partnersBorders"
//       >
//         <motion.span
//           variants={VARIANTS.top}
//           className="absolute h-3pixel w-10 bg-primary rounded-xl"
//           style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
//         />
//         <motion.span
//           variants={VARIANTS.middle}
//           className="absolute h-3pixel w-10 bg-primary rounded-xl"
//           style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
//         />
//         <motion.span
//           variants={VARIANTS.bottom}
//           className="absolute h-3pixel w-5  bg-primary rounded-xl"
//           style={{
//             x: '-50%',
//             y: '50%',
//             bottom: '35%',
//             left: 'calc(50% + 10px)',
//           }}
//         />
//       </motion.button>
//     </MotionConfig>
//   );
// };

// const VARIANTS = {
//   top: {
//     open: {
//       rotate: ['0deg', '0deg', '45deg'],
//       top: ['35%', '50%', '50%'],
//     },
//     closed: {
//       rotate: ['45deg', '0deg', '0deg'],
//       top: ['50%', '50%', '35%'],
//     },
//   },
//   middle: {
//     open: {
//       rotate: ['0deg', '0deg', '-45deg'],
//     },
//     closed: {
//       rotate: ['-45deg', '0deg', '0deg'],
//     },
//   },
//   bottom: {
//     open: {
//       rotate: ['0deg', '0deg', '45deg'],
//       bottom: ['35%', '50%', '50%'],
//       left: '50%',
//     },
//     closed: {
//       rotate: ['45deg', '0deg', '0deg'],
//       bottom: ['50%', '50%', '35%'],
//       left: 'calc(50% + 10px)',
//     },
//   },
// };

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

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

  return (
    <header>
      <div id="nav_bar" className=" absolute w-full py-4">
        <div className="container max-w-none lg:max-w-1030 2xl:max-w-1320 mx-auto px-4 md:px-4">
          <div className="flex items-center justify-between">
            <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <PageLogo />
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
                      : 'header__nav--open md:relative fixed min-h-screen md:min-h-full -left-full md:left-0 duration-500 md:ml-0 md:mt-0 z-50 top-0'
                  }
                >
                  {/* NAV PAGE LINKS */}
                  <ul
                    className="flex items-center gap-25 md:gap-40pixel flex-col md:flex-row h-full justify-center text-md text-primary font-sourceSansPro"
                    role="navigation"
                    aria-label="Main"
                  >
                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        href="/"
                        className={` opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
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
                        className={`opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
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
                        className={` opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                          path == '/news' ? '!opacity-100' : ''
                        }`}
                      >
                        News
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={() => setOpen(false)}
                        href="/dashboard/vsa-23/1"
                        className={`pacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                          path == '/dashboard' ? '!opacity-100' : ''
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        onClick={() => setOpen(false)}
                        className="pt-10pixel pb-14pixel px-24pixel text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white md:hidden"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/contact-us"
                  onClick={() => setOpen(false)}
                  className="pt-10pixel pb-14pixel px-24pixel text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white hidden md:inline-block"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
