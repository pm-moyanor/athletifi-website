import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import ResolveAuth from '@/components/auth/ResolveAuth';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/dashboard/Navbar';

const hero: Hero = {
  heading: '',
};

const ResolveAuthPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <CommonHero hero={hero} />
      </div>
      <ResolveAuth />
      <Footer />
    </>
  );
};

export default ResolveAuthPage;
