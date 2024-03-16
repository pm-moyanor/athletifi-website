'use client';

import type { NextPage } from 'next';
import { useParams, notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

import Charts from '@/components/dashboard/Charts';
import Footer from '@/components/common/Footer';
import HeroBanner from '@/components/dashboard/HeroBanner';
import LatestMatch from '@/components/dashboard/LatestMatchCard';
import PastMatchesLayout from '@/components/dashboard/PastMatchesLayout';
import Profile from '@/components/dashboard/ProfileCard';
import SeasonSection from '@/components/dashboard/SeasonSectionLayout';

import { IProfileProps, ILatestMatchData } from '@/types/Dashboard.type';
import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';

interface PageProps {
  params: { cardId: string | number };
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface DashboardData {
  latestMatch: ILatestMatchData; // replace 'any' with the type of your data
  matchesList: object; // replace 'any' with the type of your data
  playerProfile: IProfileProps; // replace 'any' with the type of your data
  teammates: object; // replace 'any' with the type of your data
}

// TO DO: Implement dynamic metadata generation for SEO using generateMetadata https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata
// export const metadata = {
//   title: 'Player Dashboard | AthletiFi',
//   description:
//     'Explore detailed player statistics, highlights, and more on the AthletiFi Player Dashboard.',
// };
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
const testAWSFetch = async (cardId: string) => {
  const response = await fetch(`${baseURL}/dashboard/${cardId}`);
  const data = await response.json();
  if (!cardId || !data) {
    return notFound();
  }
  return data;
};

const PlayerDashboardPage: NextPage<PageProps> = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;

  console.log(dashboardData);

  useEffect(() => {
    testAWSFetch(cardIdValue as string)
      .then((data) => {
        const dataObject = {
          latestMatch: data[0],
          matchesList: data[1],
          playerProfile: data[2],
          teammates: data[3],
        };
        setDashboardData(dataObject);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      });
  }, [cardIdValue]);
  // SEO
  // const hero: Hero = {
  //   heading: playerProfile?.name || `Player data not found`,
  //   subtitle:
  //     'Here you can find all the latest stats and highlights on a player!',
  //   title: 'AthletiFi Player Dashboard',
  // };

  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] flex justify-center w-full border-collapse">
          <HeroBanner
            name={dashboardData?.playerProfile.name}
            playerNumber={dashboardData?.playerProfile.playerNumber}
            club={dashboardData?.playerProfile.club}
            club_logo={dashboardData?.playerProfile.club_logo}
            team={dashboardData?.playerProfile.team}
            player_card_url={dashboardData?.playerProfile.player_card_url}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col py-3 lg:py-6 mt-10 max-w-[650px] lg:max-w-[1130px] lg:grid md:grid-cols-11">
            <div className="mx-3 lg:col-start-8 lg:col-span-4 lg:my-2 lg:ml-0 lg:mr-6 order-1 lg:order-3">
              <Profile
                age={dashboardData?.playerProfile.age}
                club={dashboardData?.playerProfile.club}
                league={dashboardData?.playerProfile.league}
                team={dashboardData?.playerProfile.team}
                ageGroup={dashboardData?.playerProfile.ageGroup}
                gender={dashboardData?.playerProfile.gender}
                coach={dashboardData?.playerProfile.coach}
                bio={dashboardData?.playerProfile.bio}
              />
            </div>
            <div className="mb-4 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-2 lg:order-1">
              <LatestMatch
                datetime={dashboardData?.latestMatch.datetime}
                location={dashboardData?.latestMatch.location}
                weather={dashboardData?.latestMatch.weather}
                home_team_name={dashboardData?.latestMatch.home_team_name}
                home_team_logo_url={
                  dashboardData?.latestMatch.home_team_logo_url
                }
                home_team_score={dashboardData?.latestMatch.home_team_score}
                away_team_name={dashboardData?.latestMatch.away_team_name}
                away_team_logo_url={
                  dashboardData?.latestMatch.away_team_logo_url
                }
                away_team_score={dashboardData?.latestMatch.away_team_score}
              />
            </div>
            <div className="mb-3 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-3 lg:order-2">
              <Charts />
            </div>
          </div>
        </div>
        <main className="flex flex-col items-center bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95">
          <SeasonSection />
          <span className="h-px bg-partnersBorders w-11/12 max-w-[1130px] my-8 md:my-4" />
          <PastMatchesLayout />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
