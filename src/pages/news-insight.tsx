import Backtotop from "../../components/common/Backtotop";
import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import MasteringGame from "../../components/news-insights/MasteringGames";
import RecentNewsInsights from "../../components/news-insights/RecentNewsInsights";

const newsinsight = () => {
  const hero = {
    heading: "News and Insights",
         title: "Your Title Here", // Add the 'title' property
    subtitle: "Your Subtitle Here", 
  };
  return (
    <>
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
