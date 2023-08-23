import Backtotop from "../../../components/common/Backtotop";
import CommonHero from "../../../components/common/CommonHero";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Seo from "../../../components/common/Seo";
import NewsInsightsCards from "../../../components/news-insights/NewsInsightsCards";
import MasteringGame from "../../../components/news-insights/MasteringGames";
import { GetRequestHandler } from "./../../../components/common/api/Api";
import {
  NewsDetailApiHandler,
  NewsListApiHandler,
} from "./../../../components/common/api/ApiUrls";

const Newsinsight = ({newsDetailData,allNewsData}) => {
  console.log("newsDetailDatanewsDetailDatanewsDetailData",newsDetailData)
  // SEO
  const hero = {
    heading: "News and Insights",
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
  };
  const pageSEO = {
    // SEO TITLE
    title: "News and Insights",

    // SEO DESCRIPTION
    description: "news_meta_img",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/news-insight",

    // SEO IMAGE
    image: "/news_meta_img.png",
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={pageSEO} />
      <div className="overflow_hidden">
        <div className="bg-new-hero-img bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <MasteringGame newsDetailData={newsDetailData} />
        {/* <RecentNewsInsights /> */}
        <NewsInsightsCards allNewsList={allNewsData} />
        <Footer />
        <Backtotop />
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const response = await GetRequestHandler(NewsDetailApiHandler(slug));
    const newsresponse = await GetRequestHandler(NewsListApiHandler());

    return {
      props: {
        newsDetailData: response,
        allNewsData: newsresponse,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        newsDetailData: null,
        allNewsData: null,
      },
    };
  }
}

export default Newsinsight;
