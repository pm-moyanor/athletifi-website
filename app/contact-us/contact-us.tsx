import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import ContactUsForm from '@/components/contact-us/ContactUsForm';
import { SEO_CONFIG } from '@/utils/seoConfig';

const ContactUs = () => {
  // SEO
  const hero: Hero = {
    heading: 'Connect with the AthletiFi team',
    subtitle: '',
    title: '',
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.contactUs} />
      <div className="contact-us-page__hero-bg bg-no-repeat bg-cover overflow-hidden">
        <Header />
        <CommonHero hero={hero} />
      </div>
      <main>
        <ContactUsForm />
      </main>
      <Footer />
    </>
  );
};

export default ContactUs;
