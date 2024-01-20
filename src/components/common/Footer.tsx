// This component renders the footer of the website.
// It includes copyright information and footer links.

import React from 'react';
import {
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
} from './Icon';
import Link from 'next/link';

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <>
      <footer className="border-t border-darkerSkyBlue">
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto  flex flex-col md:flex-row gap-5 items-center justify-between py-7">
          {/* PAGE LINKS */}
          <ul className=" flex gap-lg-10 gap-5">
            <li>
              <Link
                className="text-primary text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto "
                aria-label="privacy-policy"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="text-white text-base font-Segoe relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto "
                aria-label="terms-of-use"
                href="/terms-of-use"
              >
                Terms of Use
              </Link>
            </li>
          </ul>
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
