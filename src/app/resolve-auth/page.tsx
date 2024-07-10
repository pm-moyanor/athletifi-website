import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import ResolveAuth from '@/components/auth/ResolveAuth';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const hero: Hero = {
  heading: '',
};

const ResolveAuthPage = () => {
  return (
    <>
      <div>
        <Header />
        <CommonHero hero={hero} />
      </div>
      <ResolveAuth />
      <Footer />
    </>
  );
};

export default ResolveAuthPage;
