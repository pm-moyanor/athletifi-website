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
      <Header />
      <CommonHero hero={hero} />
      <SignUpForm />
      <Footer />
    </>
  );
};

export default signup;
