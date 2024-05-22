import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import TermsOfUse from '@/components/terms/TermsOfUse';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.termsOfUse.websiteURL),
  title: SEO_CONFIG.termsOfUse.title,
  openGraph: {
    description: SEO_CONFIG.termsOfUse.description,
    images: SEO_CONFIG.termsOfUse.image,
  },
};

const TermsOfUsePage = () => {
  const hero: Hero = {
    heading: 'Terms of Use',
  };

  return (
    <>
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
