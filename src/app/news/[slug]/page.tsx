'use client';

import useSWR from 'swr';
// import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import TargetArticleContent from '@/components/news-insights/TargetArticleContent';
// import { NewsSlugProps } from '@/types/News.type';
import { swrFetcher } from '@/components/common/api/Api';
import {
  newsDetailApiHandler,
  newsListApiHandler,
} from '@/components/common/api/ApiUrls';
import { filterTargetArticle } from '@/utils/helpers';

// This is the main content of the news article page, which contains the news article itself and the sidebar with the other news articles.
const NewsArticleSlugPage = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop();

  // SWR hooks for fetching news detail and list
  const { data: newsDetailData, error: detailError } = useSWR(
    slug ? newsDetailApiHandler(slug) : null,
    swrFetcher,
  );

  const { data: allNewsData, error: listError } = useSWR(
    newsListApiHandler(),
    swrFetcher,
  );

  // Error handling and loading states
  if (detailError || listError) return <div>Error: Data not available</div>;
  if (!newsDetailData || !allNewsData) return <div>Loading...</div>;

  const targetArticle = newsDetailData?.data?.[0];
  if (!targetArticle) return <div>Error: Target article not found</div>;

  // Filter out the target article from the allNewsList data
  const everyOtherArticle = filterTargetArticle(
    allNewsData?.data,
    targetArticle,
  );

  // SEO
  const hero: Hero = {
    heading: targetArticle?.title || `Article not found`,
    subtitle:
      'Here you can find all the latest news and developments from AthletiFi!',
    title: 'News and Updates for AthletiFi Sports Cards',
  };

  return (
    <>
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

export default NewsArticleSlugPage;
