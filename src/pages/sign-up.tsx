import CommonHero from '@/components/common/CommonHero';
import { HeroProps } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { SEO_CONFIG } from '@/utils/seoConfig';

const SignUp = () => {
  // SEO
  const hero: HeroProps = {
    heading: 'Start Your Digital Soccer Card Collection Journey',
    subtitle: 'Your Subtitle Here',
    title: 'Your Title Here',
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.signUp} />
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
