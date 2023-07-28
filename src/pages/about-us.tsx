import OurMIssion from "../../components/about-us/OurMIssion";
import WhatWeDo from "../../components/about-us/WhatWeDo";
import WhoweAre from "../../components/about-us/WhoweAre";
import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

const aboutUs = () => {
  const hero = {
    heading: "About Us",
  };
  return (
    <div className="overflow_hidden">
      <div className=" bg-about-hero bg-no-repeat bg-cover">
        <Header />
        <CommonHero hero={hero} />
      </div>
      <WhatWeDo />
      <OurMIssion />
      <WhoweAre />
      <Footer />
    </div>
  );
};

export default aboutUs;
