import Image from "next/image";
import React, { useEffect, useState } from "react";
const Backtotop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {scrollPosition > 200 ? (
        <div
          className="fixed  backtotop sm:bottom-7 bottom-14 right-7 z-50 md:max-h-12 md:max-w-[48px] max-h-9 max-w-[36px]  cursor-pointer bg-skyblue rounded-lg"
          onClick={() => scrollToTop()}
        >
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src="/assets/img/svg/back_to_top.svg"
              width={48}
              height={48}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Backtotop;
