'use client';

import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import ResolveAuth from '@/components/auth/ResolveAuth';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/dashboard/Navbar';
import { useRouter } from 'next/navigation';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from 'react';

import { atom, useAtom } from 'jotai';

const nextRedirectAtom = atom(localStorage.getItem('nextRedirect'));

const hero: Hero = {
  heading: '',
};

const ResolveAuthPage = () => {
  const [nextRedirect] = useAtom(nextRedirectAtom);

  const router = useRouter();
  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === 'authenticated' && nextRedirect) {
      router.push(JSON.parse(nextRedirect));
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
