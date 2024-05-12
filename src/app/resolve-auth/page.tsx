'use client';

import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import ResolveAuth from '@/components/auth/ResolveAuth';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/dashboard/Navbar';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { redirectAtom } from '@/states/userStore';

const hero: Hero = {
  heading: '',
};

const ResolveAuthPage = () => {
  const [redirectUrl] = useAtom(redirectAtom);

  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === 'authenticated') {
      if (redirectUrl === null) {
        router.push('/profile');
      } else {
        router.push(redirectUrl);
      }
    }
  }, [route, redirectUrl, router]);

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
