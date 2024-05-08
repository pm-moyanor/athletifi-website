import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import LoggedOut from '@/components/auth/LoggedOut';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

const LogoutPage = () => {
  const hero: Hero = {
    heading: '',
  };

  return (
    <>
      <div>
        <Header />
        <CommonHero hero={hero} />
      </div>
      <LoggedOut />
      <Footer />
    </>
  );
};

export default LogoutPage;
