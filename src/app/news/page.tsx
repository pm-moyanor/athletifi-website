'use client';

import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FocusArticle from '@/components/news-insights/FocusArticle';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import { Hero } from '@/types/CommonHero.type';
// import { NewsProps } from '@/types/News.type';
// import { PageSEO } from '@/types/Seo.type';
import { filterTargetArticle } from '@/utils/helpers';
// import { SEO_CONFIG } from '@/utils/seoConfig';
import { swrFetcher } from '@/components/common/api/Api';
import {
  newsListApiHandler,
  newsListFilterApiHandler,
} from '@/components/common/api/ApiUrls';
import useSWR from 'swr';

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {
//   title: 'AthletiFi News: Latest Updates & Announcements',
//   description:
//     'Stay updated with the latest news and insights from AthletiFi. Discover new updates, announcements, and in-depth articles.',
// };

// The main functional component for the News and Insights page
const NewsPage = () => {
  // Using SWR to fetch the news list
  const { data: allNewsList, error: allNewsListError } = useSWR(
    newsListApiHandler(),
    swrFetcher,
  );
  // Using SWR to fetch the filtered news list
  const { data: filteredNewsList, error: filteredNewsListError } = useSWR(
    newsListFilterApiHandler(),
    swrFetcher,
  );
  const filteredNewsListData = filteredNewsList?.data || [];

  // Handling loading and error states
  if (allNewsListError || filteredNewsListError)
    return <div>Error loading news data.</div>;
  if (!allNewsList || !filteredNewsList) return <div>Loading news...</div>;

  // Assuming the first article is the focus article
  const targetArticle = allNewsList?.data?.[0];
  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // Filter out the target article from the allNewsList data
  const allNewsButTargetArticle = filterTargetArticle(
    allNewsList?.data,
    targetArticle,
  );

  if (!targetArticle) {
    return <div>Error: Target article not found</div>;
  }

  // TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
  // SEO
  const hero: Hero = {
    heading: 'Latest Updates & Announcements',
  };
  // // Update dynamic parts of the SEO properties
  // const newsPageSEO: PageSEO = {
  //   ...SEO_CONFIG.news, // Spread the static properties
  //   description: targetArticle?.previewSummary, // Dynamically update the description
  //   image: `https://vidalco.in${targetArticle?.image.url}`, // Dynamically update the image URL
  // };

  return (
    <>
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <FocusArticle newsListData={filteredNewsListData} />
        <NewsInsightsCards allNewsList={allNewsButTargetArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default NewsPage;
