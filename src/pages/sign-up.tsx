import CommonHero from "@/components/common/CommonHero";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Seo from "@/components/common/Seo";
import SignUpForm from "@/components/sign-up/SignUpForm";
import { SEO_CONFIG } from "@/utils/seoConfig";

const SignUp = () => {
  // SEO
  const hero = {
    heading: "Start Your Digital Soccer Card Collection Journey",
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
  };

  return (
    <>
      {/* SEO */}
      <Seo pageSEO={SEO_CONFIG.signUp} />
      <div className="bg-signup-hero-img bg-no-repeat bg-cover overflow-hidden">
        <Header />
        <CommonHero hero={hero} />
      </div>
      <SignUpForm />
      <Footer />
    </>
  );
};

export default SignUp;
