'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  WhiteFacebookIcon,
  WhiteInstaIcon,
  WhiteLinkedInIcon,
  TikTokIcon,
  WhiteTwitterIcon,
  PageLogo,
} from '../common/Icon';

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
const linksStyle = `opacity-80 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto`;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <header>
      <div id="nav_bar" className=" absolute w-full py-4 font-sourceSansPro">
        <div className="container flex items-center justify-between w-full max-w-none lg:max-w-1130 2xl:max-w-1320 px-4">
          <Link href="/">
            <PageLogo />
          </Link>
          {/* SMALL SCREEN MENU ICONS */}
          <div
            onClick={() => setOpen(!open)}
            className="flex flex-col md:hidden bg-transparent border-0 relative z-50 cursor-pointer p-4"
          >
            <span className="h-3pixel w-8 bg-white inline-block rounded-sm"></span>
            <span className="my-2 h-3pixel w-7 bg-white inline-block rounded-sm"></span>
            <span className="h-3pixel w-8 bg-white inline-block rounded-sm"></span>
          </div>
          <div
            className={
              open
                ? 'header__nav--open h-full w-full z-20 fixed top-0 left-0 duration-500 transition-all bg-cardsDark flex items-center justify-center flex-col'
                : 'header__nav--open md:relative fixed min-h-screen md:min-h-full -left-full md:left-0 duration-500 md:ml-0 md:mt-0 z-50 top-0'
            }
          >
            {/* NAV PAGE LINKS */}
            <ul
              className=" h-full flex items-center gap-[20px] md:gap-40pixel flex-col md:flex-row  justify-center text-5xl md:text-base text-primary font-sourceSansPro"
              role="navigation"
              aria-label="Main"
            >
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/"
                  className={` ${linksStyle} 
                  `}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/about-us"
                  className={` ${linksStyle}  
                    
                  `}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/news?page=1"
                  className={` ${linksStyle}  `}
                >
                  News
                </Link>
              </li>

              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href="/contact-us"
                  className={` ${linksStyle}  
                 
                  `}
                >
                  Contact
                </Link>
              </li>

              <li>
                <div className="flex font-sourceSansPro flex-1 mt-8 md:mt-0 md:ml-[75px] justify-end max-w-[280px]">
                  <button className=" text-primary w-[100px] h-8 text-sm border border-offwhite rounded-full font-extralight hover:bg-skyblue hover:border-skyblue">
                    <Link href="/login">Log in</Link>
                  </button>
                  <button className="text-darkgray ml-2 w-[100px]  bg-skyblue text-sm rounded-full">
                    <Link href="/register">Sign up</Link>
                  </button>
                </div>
              </li>
            </ul>
            {open && (
              <>
                <div className="h-1 bg-offwhite w-4/5 mt-12 mb-6 " />
                <div className="mt-auto mb-12">
                  <div className="flex gap-4 md:order-3 px-15 md:px-0">
                    <Link
                      aria-label="Tik-Tok"
                      className="hover:-translate-y-1 transition duration-300 ease-out"
                      href="https://www.tiktok.com/@athletifi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TikTokIcon />
                    </Link>
                    <Link
                      aria-label="facebook"
                      className="hover:-translate-y-1 transition duration-300 ease-out"
                      href="https://www.facebook.com/profile.php?id=61553263775533"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhiteFacebookIcon />
                    </Link>
                    <Link
                      aria-label="twitter"
                      className="hover:-translate-y-1 transition duration-300 ease-out"
                      href="https://twitter.com/Athletifi"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhiteTwitterIcon />
                    </Link>
                    <Link
                      aria-label="instagram"
                      className="hover:-translate-y-1 transition duration-300 ease-out"
                      href="https://www.instagram.com/athletifi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhiteInstaIcon />
                    </Link>
                    <Link
                      aria-label="linkedin"
                      className="hover:-translate-y-1 transition duration-300 ease-out"
                      href="https://www.linkedin.com/company/athletifi/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhiteLinkedInIcon />
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
