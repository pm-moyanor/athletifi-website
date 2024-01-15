import React from "react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10 text-white not-found__container">
      <div className="text-3xl font-bold mb-5">Oops. There was a problem.</div>
      <div className="mb-1">
        We could not find the page you were looking for.
      </div>
      <div className="mb-10">
        Go back to the{" "}
        <Link href="/" className="not-found__link">
          home page
        </Link>
      </div>
    </div>
  );
};
export default Custom404;
