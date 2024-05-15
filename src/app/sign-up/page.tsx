import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.signUp.websiteURL),
  title: SEO_CONFIG.signUp.title,
  openGraph: {
    description: SEO_CONFIG.signUp.description,
    images: SEO_CONFIG.signUp.image,
  },
};

const SignUp = () => {
  // SEO
  const hero: Hero = {
    heading: 'Start Your Digital Soccer Card Collection Journey',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };

  return (
    <>
      <div className="signup-page__hero-bg bg-no-repeat bg-cover overflow-hidden">
        <Header />
        <CommonHero hero={hero} />
      </div>
      <main>
        <SignUpForm />
      </main>
      <Footer />
    </>
  );
};

export default SignUp;
