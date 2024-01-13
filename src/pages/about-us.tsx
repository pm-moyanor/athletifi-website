// about-us.tsx

// This file renders the "About Us" page.
// It includes various components to display information about the company.

import OurMission from "@/components/about-us/OurMission";
import WhatWeDo from "@/components/about-us/WhatWeDo";
import WhoWeAre from "@/components/about-us/WhoWeAre";
import BackToTop from "@/components/common/BackToTop";
import CommonHero from "@/components/common/CommonHero";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Seo from "@/components/common/Seo";
import { SEO_CONFIG } from "@/utils/seoConfig";

const AboutUs = () => {
  // SEO
  const hero = {
    heading: "About Us",
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
  };

  return (
    <>
      <Seo pageSEO={SEO_CONFIG.aboutUs} />
      <div className="overflow_hidden">
        <div className=" bg-about-hero bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <WhatWeDo />
        <OurMission />
        <WhoWeAre />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default AboutUs;
