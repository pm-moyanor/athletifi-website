import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero';
import Custom404 from '@/components/common/Custom404';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { SEO_CONFIG } from '@/utils/seoConfig';
import { Metadata } from 'next';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';
import { addUserPostSignIn } from '@/app/actions/userDataActions';

export const metadata: Metadata = {
  title: SEO_CONFIG.notFound.title,
  description: SEO_CONFIG.notFound.description,
  openGraph: {
    images: SEO_CONFIG.notFound.image,
  },
};

export default async function NotFound({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const hero: Hero = {
    heading: '',
  };

  const auth = await isAuthenticated();
  if (auth.isSignedIn) {
    await addUserPostSignIn(
      auth.email,
      auth.name,
      auth.userId,
      searchParams?.invite_id,
    );
  }
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <div>
        <Header userData={userData as UserData} />
        <CommonHero hero={hero} />
      </div>
      <Custom404 />
      <Footer />
    </>
  );
}
