import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import LoggedOut from '@/components/auth/LoggedOut';
import Footer from '@/components/common/Footer';

const LogoutPage = () => {
  const hero: Hero = {
    heading: '',
  };

  return (
    <>
      <CommonHero hero={hero} />
      <LoggedOut />
      <Footer />
    </>
  );
};

export default LogoutPage;
