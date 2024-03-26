import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import SignUpIn from '@/components/signup-signin/SignUpIn';

const LoginPage = () => {
  return (
    <div>
      <Header />

      <main>
        <SignUpIn isSignupPage={false} />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
