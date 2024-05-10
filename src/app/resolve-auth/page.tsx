'use client';

import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import ResolveAuth from '@/components/auth/ResolveAuth';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/dashboard/Navbar';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';

const hero: Hero = {
  heading: '',
};

const ResolveAuthPage = () => {
  const [nextRedirect, setNextRedirect] = useState<string | null>(null);

  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    setNextRedirect(localStorage.getItem('nextRedirect'));
  }, []);

  useEffect(() => {
    if (route === 'authenticated' && nextRedirect) {
      router.push(nextRedirect.replace(/"/g, ''));
    }
  }, [route, nextRedirect, router]);

  return (
    <>
      <div>
        <Navbar />
        <CommonHero hero={hero} />
      </div>
      <ResolveAuth />
      <Footer />
    </>
  );
};

export default ResolveAuthPage;
