import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SignUpIn from '@/components/signup-signin/SignUpIn';

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <main>
        <SignUpIn isSignupPage={true} />;
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
