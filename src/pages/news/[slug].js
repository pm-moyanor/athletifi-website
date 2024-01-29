import BackToTop from '../../components/common/BackToTop';
import CommonHero from '../../components/common/CommonHero';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import NewsInsightsCards from '../../components/news-insights/NewsInsightsCards';
import TargetArticleContent from '../../components/news-insights/TargetArticleContent';
import { getRequestHandler } from '../../components/common/api/Api';
import {
  newsDetailApiHandler,
  newsListApiHandler,
} from '../../components/common/api/ApiUrls';
import { filterTargetArticle } from '../../../src/utils/helpers';

// This is the main content of the news article page, which contains the news article itself and the sidebar with the other news articles.

const NewsArticleSlugPage = ({ newsDetailData, allNewsData }) => {
  if (!newsDetailData || !allNewsData) {
    return <div>Error: Data not available</div>;
  }
  const targetArticle = newsDetailData?.data?.[0];

  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }
  // Filter out the target article from the allNewsList data
  const everyOtherArticle = filterTargetArticle(allNewsData, targetArticle);

  // SEO
  const hero = {
    heading: targetArticle?.title || `Article not found`,
    subtitle:
      'Here you can find all the latest news and developments from AthletiFi!',
    title: 'News and Updates for AthletiFi Sports Cards',
  };

  return (
    <>
      {/* SEO */}
      {/* <Seo pageSEO={pageSEO} /> */}
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent newsDetailData={newsDetailData} />
        <NewsInsightsCards allNewsList={everyOtherArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const response = await getRequestHandler(newsDetailApiHandler(slug));
    const newsResponse = await getRequestHandler(newsListApiHandler());

    return {
      props: {
        allNewsData: newsResponse,
        newsDetailData: response,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        allNewsData: null,
        newsDetailData: null,
      },
    };
  }
}

export default NewsArticleSlugPage;
