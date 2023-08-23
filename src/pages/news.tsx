import Backtotop from "../../components/common/Backtotop";
import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Seo from "../../components/common/Seo";
import LatestNews from "../../components/home/LatestNews";
import NewsCard from "../../components/news-insights/NewsCard";
import NewsInsightsCards from "../../components/news-insights/NewsInsightsCards";

import { GetRequestHandler } from "../../components/common/api/Api";
import {
  NewsListApiHandler,
  NewsListFilterApiHandler,
} from "../../components/common/api/ApiUrls";

interface NewsProps {
  newsListData: any;
  allNewsList: any;
}
const Newsinsight: React.FC<NewsProps> = (props) => {
  const { newsListData, allNewsList } = props;

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
        {/* <MasteringGame /> */}
        <NewsCard newsListData={newsListData} />
        {/* <RecentNewsInsights /> */}

        <NewsInsightsCards allNewsList={allNewsList} />
        <Footer />
        <Backtotop />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const response = await GetRequestHandler(NewsListApiHandler());
    const responseFilter = await GetRequestHandler(NewsListFilterApiHandler());
    const NewsData = responseFilter && responseFilter.data;

    return {
      props: {
        newsListData: NewsData,
        allNewsList: response,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        newsListData: null,
        allNewsList: null,
      },
    };
  }
}

export default Newsinsight;
