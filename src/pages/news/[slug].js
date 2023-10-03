import Backtotop from "../../../components/common/Backtotop";
import CommonHero from "../../../components/common/CommonHero";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Seo from "../../../components/common/Seo";
import NewsInsightsCards from "../../../components/news-insights/NewsInsightsCards";
import TargetArticleContent from "../../../components/news-insights/TargetArticleContent";
import { GetRequestHandler } from "../../../components/common/api/Api";
import {
  NewsDetailApiHandler,
  NewsListApiHandler,
} from "../../../components/common/api/ApiUrls";

const NewsArticleSlugPage = ({ newsDetailData, allNewsData }) => {
  console.log(newsDetailData, "newsDetailDataCKKKKKK");
  let targetArticle = null;
  if (newsDetailData && newsDetailData.data && newsDetailData.data.length > 0) {
    targetArticle = newsDetailData.data[0];
  }
  // SEO
  const hero = {
    // heading: "News and InsightsSLUGSLUGSLUG",
    heading: targetArticle.title || `Article not found`,
    title: "News and Insights for AthletiFi Sports Cards",
    subtitle: "Here you can find all the latest news and developments from AthletiFi!",
  };

  // const pageSEO = {
  //   // // SEO TITLE
  //   title: `${newsDetailData && newsDetailData.data[0].title}`,

  //   // // SEO DESCRIPTION
  //   description: `${newsDetailData.data[0].description}`,

  //   // // SEO WEBSITE URL
  //   websiteURL: `https://athletifi-website.vercel.app`,

  //   // // SEO IMAGE
  //   image: `https://vidalco.in${newsDetailData.data[0].image.url}`,
  // };

  // console.log(newsDetailData, "newsDetailData")
  console.log(allNewsData, "ALL NEWS DATA")
  return (
    <>
      {/* SEO */}
      {/* <Seo pageSEO={pageSEO} /> */}
      <div className="overflow_hidden">
        <div className="bg-new-hero-img bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent newsDetailData={newsDetailData} />
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
  // console.log("slugslugslug", slug)
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

export default NewsArticleSlugPage;
