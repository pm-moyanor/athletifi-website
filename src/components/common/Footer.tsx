'use client';
// This component renders the footer of the website.
// It includes copyright information and footer links.
import React, { useEffect, useState } from 'react';
import {
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
  PageLogo,
  ArrowButton,
} from './Icon';
import Link from 'next/link';

const Footer = () => {
  const today: Date = new Date();
  const year: number = today.getFullYear();

  // Initialize path state with empty string
  const [path, setPath] = useState('');

  // Effect hook to set path on client-side
  useEffect(() => {
    // Use window.location.pathname to get the current path
    setPath(window.location.pathname);
  }, []);

  return (
    <>
      <footer className="flex flex-col border-t border-darkerSkyBlue h-541">
        <div className="container flex flex-col items-start gap-5 md:flex-row md:justify-between md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto my-32">
          <div className="flex flex-col justify-start">
            <ul>
              <li>
                <Link
                  href="/"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/' ? '!opacity-100' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/about-us' ? '!opacity-100 ' : ''
                  }`}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
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
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/contact-us' ? '!opacity-100' : ''
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              {/* 
                UNCOMMENT WHEN YOU ARE READY TO RE-ADD THE DASHBOARD TO THE MENUBAR
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/dashboard"
                    className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/dashboard' ? '!opacity-100' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                </li> */}
            </ul>
          </div>
          <div className="flex flex-col justify-start">
            <ul>
              <li>
                <Link
                  href="https://www.athletifiselect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto
              
                  }`}
                >
                  Athletifi Select
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/privacy-policy' ? '!opacity-100' : ''
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/terms-of-use' ? '!opacity-100' : ''
                  }`}
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link
              href="/contact-us"
              className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-6pixel group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out social-popup__btn"
            >
              Contact Us
              <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                <ArrowButton />
              </span>
            </Link>
          </div>
        </div>

        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto  flex flex-col md:flex-row gap-5 items-center justify-between py-7 border-t border-extraDarkBlue">
          <div>
            <Link href="/">
              <PageLogo />
            </Link>
          </div>
          <p className="text-white text-sm font-Segoe opacity-70">
            @{year} Athletifi. All rights reserved
          </p>

          {/* SOCIAL-ICON */}
          <div className="flex gap-4">
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
              <FacebookIcon />
            </Link>
            <Link
              aria-label="twitter"
              className="hover:-translate-y-1 transition duration-300 ease-out"
              href="https://twitter.com/Athletifi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </Link>
            <Link
              aria-label="instagram"
              className="hover:-translate-y-1 transition duration-300 ease-out"
              href="https://www.instagram.com/athletifi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstaIcon />
            </Link>
            <Link
              aria-label="linkedin"
              className="hover:-translate-y-1 transition duration-300 ease-out"
              href="https://www.linkedin.com/company/athletifi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
