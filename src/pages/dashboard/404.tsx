import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Dashboard404 from '@/components/common/Dashboard404';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

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
      <Dashboard404 />
      <Footer />
    </>
  );
};

export default NotFound;
