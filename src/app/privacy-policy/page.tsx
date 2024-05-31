import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import PrivacyPolicy from '@/components/terms/PrivacyPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SEO_CONFIG.privacyPolicy.title,
  description: SEO_CONFIG.privacyPolicy.description,
  openGraph: {
    images: SEO_CONFIG.privacyPolicy.image,
  },
};

const PrivacyPolicyPage = () => {
  const hero: Hero = {
    heading: 'Privacy Policy',
  };

  return (
    <>
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
