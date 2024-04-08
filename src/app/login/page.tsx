import Footer from '@/components/common/Footer';
import Navbar from '@/components/dashboard/NavBar';
import SignUpIn from '@/components/signup-signin/SignUpIn';

const LoginPage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <SignUpIn isSignupPage={false} />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
