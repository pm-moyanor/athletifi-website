import Backtotop from "../../components/common/Backtotop";
import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Seo from "../../components/home/Seo";
import MasteringGame from "../../components/news-insights/MasteringGames";
import RecentNewsInsights from "../../components/news-insights/RecentNewsInsights";

const newsinsight = () => {
  const hero = {
    heading: "News and Insights",
         title: "Your Title Here", // Add the 'title' property
    subtitle: "Your Subtitle Here", 
  };
  const pageSEO = {
    // SEO TITLE
    title: "News and Insights",

    // SEO DESCRIPTION
    description:
      "Unlocking opportunities for aspiring young athletes. Connecting all talent, no matter where they are from, with top-tier coaches, scholarships, and unparalledled resources. Welcome to the future of sports... for everyone!",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/news-insight",

    // SEO IMAGE
    image: "/lending_meta_img.webp",
  };
  return (
    <>
    <Seo pageSEO={pageSEO} />
      <div className="overflow_hidden">
        <div className="bg-new-hero-img bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <MasteringGame />
        <RecentNewsInsights />
        <Footer />
        <Backtotop />
      </div>
    </>
  );
};

export default newsinsight;
