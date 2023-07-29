import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Seo from "../../components/home/Seo";
import SignUpForm from "../../components/sign-up/SignUpForm";


const signup = () => {
  const hero = {
    heading: "Sign Up for Exclusive Access!",
         title: "Your Title Here", // Add the 'title' property
    subtitle: "Your Subtitle Here", 
  };
  const pageSEO = {
    // SEO TITLE
    title: "Sign Up for Exclusive Access!",

    // SEO DESCRIPTION
    description:
      "Unlocking opportunities for aspiring young athletes. Connecting all talent, no matter where they are from, with top-tier coaches, scholarships, and unparalledled resources. Welcome to the future of sports... for everyone!",

    // SEO WEBSITE URL
    websiteURL: "https://athletifi-web.vercel.app/news-insight",

    // SEO IMAGE
    image: "/lending_meta_img.webp",
  };
  return (
    <>
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

export default signup;
