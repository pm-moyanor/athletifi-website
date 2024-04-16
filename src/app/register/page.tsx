'use client';

// import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
// import SignUpIn from '@/components/signup-signin/SignUpIn';
import AuthComponent from '@/components/signup-signin/AuthComponent';

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <main className="mt-40 mb-20">
        {/* <SignUpIn isSignupPage={true} />; */}
        <AuthComponent />
      </main>
    </div>
  );
};

export default RegisterPage;
