import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Custom404 from '@/components/common/Custom404';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';

export const metadata = {
  title: SEO_CONFIG.notFound.title,
  description: SEO_CONFIG.notFound.description,
  // Since there's no image specified for this page, omit the openGraph images property
};

const NotFound = () => {
  const hero: Hero = {
    heading: '',
  };

  return (
    <>
      <div>
        <Header />
        <CommonHero hero={hero} />
      </div>
      <Custom404 />
      <Footer />
    </>
  );
};

export default NotFound;
