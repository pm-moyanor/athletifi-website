import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Custom404 from '@/components/common/Custom404';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const NotFound = () => {
  const hero: Hero = {
    heading: 'Player not found',
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
