import CommonHero from '@/components/common/CommonHero';
import { HeroProps } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import TermsOfUse from '@/components/terms/TermsOfUse';

const TermsOfUsePage = () => {
  const hero: HeroProps = {
    heading: 'Terms of Use',
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.signUp} />
      <Header />
      <CommonHero hero={hero} />
      <main>
        <TermsOfUse />
      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
