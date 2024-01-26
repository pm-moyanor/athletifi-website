import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import PrivacyPolicy from '@/components/terms/PrivacyPolicy';

const PrivacyPolicyPage = () => {
  const hero: Hero = {
    heading: 'Privacy Policy',
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.signUp} />
      <Header />
      <CommonHero hero={hero} />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
