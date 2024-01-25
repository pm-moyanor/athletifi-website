import { GetServerSideProps } from 'next';

import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { HeroProps } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
// import Seo from '@/components/common/Seo';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import TargetArticleContent from '@/components/news-insights/TargetArticleContent';
import { NewsSlugProps } from '@/types/News.type';
import { getRequestHandler } from '@/components/common/api/Api';
import {
  newsDetailApiHandler,
  newsListApiHandler,
} from '@/components/common/api/ApiUrls';
import { filterTargetArticle } from '@/utils/helpers';

// This is the main content of the news article page, which contains the news article itself and the sidebar with the other news articles.

const NewsArticleSlugPage = ({
  newsDetailData,
  allNewsData,
}: NewsSlugProps) => {
  const targetArticle = newsDetailData?.data?.[0];

  // Filter out the target article from the allNewsList data
  const everyOtherArticle = filterTargetArticle(
    allNewsData?.data,
    targetArticle
  );

  // SEO
  const hero: HeroProps = {
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

export const getServerSideProps = (async context => {
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
}) satisfies GetServerSideProps;

export default NewsArticleSlugPage;
