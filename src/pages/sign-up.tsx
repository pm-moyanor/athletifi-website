import CommonHero from "../../components/common/CommonHero";
import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import SignUpForm from "../../components/sign-up/SignUpForm";


const signup = () => {
  const hero = {
    heading: "Sign Up for Exclusive Access!",
         title: "Your Title Here", // Add the 'title' property
    subtitle: "Your Subtitle Here", 
  };
  return (
    <>
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
