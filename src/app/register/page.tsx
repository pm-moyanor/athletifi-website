import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Signup from '@/components/login/SignUp';
import React from 'react';

function Register() {
  return (
    <div>
      <Header />

      <main>
        <Signup />;
      </main>
      <Footer />
    </div>
  );
}

export default Register;
