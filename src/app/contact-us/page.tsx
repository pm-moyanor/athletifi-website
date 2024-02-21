import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import ContactUsForm from '@/components/contact-us/ContactUsForm';
import { SEO_CONFIG } from '@/utils/seoConfig';

export const metadata = {
  title: SEO_CONFIG.contactUs.title,
  description: SEO_CONFIG.contactUs.description,
  openGraph: {
    images: SEO_CONFIG.contactUs.image,
  },
};

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
