import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  NavLogo,
  ArrowButton,
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  TiktokIcon,
  TwitterIcon,
  CancleIcon,
} from "./Icon";

const Header = () => {
  const [open, setOpen] = useState(false);
  const path = useRouter().pathname;
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (open) {
        document.body.classList.add("overflow_hidden");
      } else {
        document.body.classList.remove("overflow_hidden");
      }
    }
  }, [open]);

  // ==============================================
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollPosition(currentScrollPos);
      const isVisible = prevScrollPos > currentScrollPos;
      setIsVisible(isVisible);
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // ====================================================== nav-social-icon
  const [navSocialIcon, setNavSocialIcon] = useState(true);
  const SocialIcon = () => {
    setOpen(false);
    setNavSocialIcon(!navSocialIcon);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navSocialIcon) {
        document.body.classList.remove("overflow_hidden");
      } else {
        document.body.classList.add("overflow_hidden");
      }
    }
  }, [navSocialIcon]);
  return (
    <>
      <div
        ref={navbarRef}
        id="nav_bar"
        className={`navbar fixed top-0 black w-full bg-bgnav py-2 sm:py-[13px] z-40 ${
          scrollPosition > 200 ? "slideUp" : "slideDown"
        } ${isVisible ? "slideDown" : "slideUp"}`}
      >
        <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto">
          <div className="flex items-center justify-between">
            <Link aria-label="home page" href="/">
              <NavLogo />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col sm:hidden bg-transparent border-0 relative z-50"
            >
              <span className="h-[3px] w-[35px] bg-white inline-block rounded-sm"></span>
              <span className="my-2 h-[3px] w-[27px] bg-white inline-block rounded-sm"></span>
              <span className="h-[3px] w-[35px] bg-white inline-block rounded-sm"></span>
            </button>
            <div
              className={
                open
                  ? "nav_open z-20 fixed top-0 left-0 w-full min-h-screen"
                  : "sm:relative fixed min-h-screen sm:min-h-full -left-full sm:left-0 sm:ml-0 nav_open sm:mt-0 z-40 top-0"
              }
            >
              <ul className="flex items-center gap-[40px] flex-col sm:flex-row h-full justify-center ">
                <li>
                  <Link
                    aria-label="home page"
                    onClick={() => setOpen(false)}
                    href="/"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:left-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out ${
                      path == "/" ? "!opacity-100" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="About us page"
                    onClick={() => setOpen(false)}
                    href="/about-us"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:left-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out ${
                      path == "/about-us" ? "!opacity-100 " : ""
                    }`}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="News page"
                    onClick={() => setOpen(false)}
                    href="/news-insight"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:left-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out ${
                      path == "/news-insight" ? "!opacity-100" : ""
                    }`}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <button
                    onClick={SocialIcon}
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:left-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out ${
                      path == "/SocialIcons" ? "!opacity-100" : ""
                    }`}
                  >
                    Socials
                  </button>
                </li>
                <li>
                  <Link
                    aria-label="sign-up page"
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="pt-[10px] pb-[14px] px-[24px] text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white sm:hidden"
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="pt-[10px] pb-[14px] px-[24px] text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white hidden sm:inline-block"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
      {/* ================================================= */}
      <div className={navSocialIcon ? "hidden" : "block"}>
        <div
          onClick={() => setNavSocialIcon(true)}
          className="relative h-full z-50"
        >
          {/* <span
            className="absolute z-30 right-[10px] top-[10px] lg:top-0 cursor-pointer"
            onClick={() => setNavSocialIcon(true)}
          >
            <CancleIcon />
          </span> */}
          <div className="min-h-screen bg_social_icon flex items-center justify-center gap-[20px] flex-col-reverse sm:flex-row fixed top-0 left-0 w-full z-20">
            <Link
              href="/sign-up"
              className="sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out social_btn_contact_us"
            >
              Contact Us
              <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                <ArrowButton />
              </span>
            </Link>
            <div className="flex gap-4">
              <Link
                className="hover:-translate-y-2 transition duration-300 ease-out"
                href="https://www.tiktok.com/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiktokIcon />
              </Link>
              <Link
                className="hover:-translate-y-2 transition duration-300 ease-out"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </Link>
              <Link
                className="hover:-translate-y-2 transition duration-300 ease-out"
                href="https://twitter.com/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </Link>
              <Link
                className="hover:-translate-y-2 transition duration-300 ease-out"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/assets/img/svg/Instagram.svg"
                  alt="grid-lines"
                  width={32}
                  height={32}
                />
              </Link>
              <Link
                className="hover:-translate-y-2 transition duration-300 ease-out"
                href="https://in.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
