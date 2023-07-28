import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import RecentNewsInsights from "../../components/news-insights/RecentNewsInsights";


const newsinsight = () => {
  const hero = {
    heading: "News and Insights",
  };
  return (
    <>
      <Header />
      <CommonHero hero={hero} />
      <RecentNewsInsights />
      <Footer />
    </>
  );
};

export default newsinsight;
