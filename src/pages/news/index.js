import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import FocusArticle from '@/components/news-insights/FocusArticle';
import NewsInsightsCards from '@/components/news-insights/NewsInsightsCards';
import { filterTargetArticle } from '@/utils/helpers';
import { SEO_CONFIG } from '@/utils/seoConfig';

// Importing API handlers for fetching news data
import { getRequestHandler } from '@/components/common/api/Api';
import {
  newsListApiHandler,
  newsListFilterApiHandler,
} from '@/components/common/api/ApiUrls';

// The main functional component for the News and Insights page
const NewsPage = ({ newsListData, allNewsList }) => {
  // Use optional chaining to simplify target article assignment
  const targetArticle = newsListData?.[0];

  // Filter out the target article from the allNewsList data
  const filteredNewsList = filterTargetArticle(allNewsList, targetArticle);

  // SEO
  const hero = {
    heading: 'Latest Updates & Announcements',
    // title: "Your Title Here",
    // subtitle: "Your Subtitle Here",
  };
  // Update dynamic parts of the SEO properties
  const newsPageSEO = {
    ...SEO_CONFIG.news, // Spread the static properties
    description: targetArticle?.previewSummary, // Dynamically update the description
    image: `https://vidalco.in${targetArticle?.image.url}`, // Dynamically update the image URL
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={newsPageSEO} />
      <div className="overflow-hidden">
        <div className="news-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <FocusArticle newsListData={newsListData} />
        <NewsInsightsCards allNewsList={filteredNewsList} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

// Server-side data fetching for the News and Insights page
export async function getServerSideProps() {
  try {
    // Fetching news list and filter data
    const response = await getRequestHandler(newsListApiHandler());
    const responseFilter = await getRequestHandler(newsListFilterApiHandler());

    // Use optional chaining to safely access data
    const newsData = responseFilter?.data;

    return {
      props: {
        allNewsList: response,
        newsListData: newsData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        allNewsList: null,
        newsListData: null,
      },
    };
  }
}

export default NewsPage;
