import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Seo from "../../components/common/Seo";
import SignUpForm from "../../components/sign-up/SignUpForm";

const Signup = () => {
  // SEO
  const hero = {
    heading: "Sign Up for Exclusive Access!",
    title: "Your Title Here",
    subtitle: "Your Subtitle Here",
  };
  const pageSEO = {
    // SEO TITLE
    title: "Sign Up for Exclusive Access!",

    // SEO DESCRIPTION
    description:
      "Signup for exclusive updates! Become part of the sport's revolution.",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/news-insight",

    // SEO IMAGE
    image: "/sign_up_meta",
  };
  return (
    <>
      {/* SEO */}
      <Seo pageSEO={pageSEO} />
      <div className="bg-signup-hero-img bg-no-repeat bg-cover overflow-hidden">
        <Header />
        <CommonHero hero={hero} />
      </div>
      <SignUpForm />
      <Footer />
    </>
  );
};

export default Signup;
