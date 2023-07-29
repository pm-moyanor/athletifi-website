import React, { useEffect, useRef, useState } from "react";
import { NavLogo } from "./Icon";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const [open, setOpen] = useState(false);
  const path = useRouter().pathname;
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Code that references 'document' can be safely placed here
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
            <Link href="/">
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
                    onClick={() => setOpen(false)}
                    href="/"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 ${
                      path == "/" ? "!opacity-100" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/about-us"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 ${
                      path == "/about-us" ? "!opacity-100 " : ""
                    }`}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/news-insight"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 ${
                      path == "/news-insight" ? "!opacity-100" : ""
                    }`}
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/socials"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 ${
                      path == "/socials" ? "!opacity-100" : ""
                    }`}
                  >
                    Socials
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setOpen(false)}
                    className="py-[10px] px-[24px] text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white sm:hidden"
                  >
                    Sign up
                  </button>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="py-[10px] px-[24px] text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white hidden sm:inline-block"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
