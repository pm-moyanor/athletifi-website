'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
// import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import type { NextPage } from 'next';
import { notFound } from 'next/navigation';

import Charts from '@/components/dashboard/Charts';

interface PageProps {
  params: { cardId: number };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const MIN_PLAYER_ID = 1;
const MAX_PLAYER_ID = 1134;

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {
//   title: 'Player Dashboard | AthletiFi',
//   description:
//     'Explore detailed player statistics, highlights, and more on the AthletiFi Player Dashboard.',
// };

const PlayerDashboardPage: NextPage<PageProps> = ({ params }) => {
  const { cardId } = params;
  if (cardId < MIN_PLAYER_ID || cardId > MAX_PLAYER_ID) {
    notFound();
  }

  // SAMPLE DATA
  // TODO: FETCH PLAYER DATA FROM BACKEND
  const playerProfile = {
    name: 'Lionel Messi',
  };

  // SEO
  const hero: Hero = {
    heading: playerProfile?.name || `Player data not found`,
    subtitle:
      'Here you can find all the latest stats and highlights on a player!',
    title: 'AthletiFi Player Dashboard',
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="about-page__hero-bg bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <main className="flex flex-col min-h-full max-w-full px-3 py-3">
          <Charts />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
