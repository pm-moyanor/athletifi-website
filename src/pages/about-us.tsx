import OurMission from "../../components/about-us/OurMIssion";
import WhatWeDo from "../../components/about-us/WhatWeDo";
import WhoweAre from "../../components/about-us/WhoweAre";
import Backtotop from "../../components/common/Backtotop";
import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Seo from "../../components/common/Seo";

const AboutUs = () => {
  // SEO
  const hero = {
    heading: "About us",
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
  };
  const pageSEO = {
    // SEO TITLE
    title: "About-us",

    // SEO DESCRIPTION
    description:
      "We are a sports technology app that makes travel soccer teams more accessible for all players. Our mission is to level the playing field for enrollment in travel teams and club soccer -- to give every athlete equal access to exposure from scouts. A portion of every sale goes directly to teams.",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/about-us",

    // SEO IMAGE
    image: "/about_us_meta.png",
  };
  return (
    <>
      {/* SEO */}
      <Seo pageSEO={pageSEO} />
      <div className="overflow_hidden">
        <div className=" bg-about-hero bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <WhatWeDo />
        <OurMission />
        <WhoweAre />
        <Footer />
        <Backtotop />
      </div>
    </>
  );
};

export default AboutUs;
