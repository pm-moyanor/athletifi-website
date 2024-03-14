'use client';

import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

import Charts from '@/components/dashboard/Charts';
// import CommonHero from '@/components/common/CommonHero';
import Footer from '@/components/common/Footer';
// import Header from '@/components/common/Header';
// import { Hero } from '@/types/CommonHero.type';
import HeroBanner from '@/components/dashboard/HeroBanner';
import LatestMatch from '@/components/dashboard/LatestMatchCard';
import PastMatchesLayout from '@/components/dashboard/PastMatchesLayout';
import Profile from '@/components/dashboard/ProfileCard';
import SeasonSection from '@/components/dashboard/SeasonSectionLayout';

import {
  IProfileProps,
  emptyProfileProps,
  ILatestMatchData,
  emptyLatestMatchData,
} from '@/types/Dashboard.type';
import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';

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

const dummyProfileProps: IProfileProps = {
  name: 'Salvador Carrillo',
  playerNumber: '22',
  club: 'Villanova Soccer Academy',
  club_logo:
    'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
  team: '2009',
  league: 'Youth Soccer Association',
  age: 13,
  ageGroup: 'U14',
  gender: 'Male',
  coach: 'Daniel Smith',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat est velit egestas dui id ornare arcu.',
  player_card_url:
    'https://athletifi-s3.s3.us-east-2.amazonaws.com/player-card-images/Jose+Hernandez_13_standing_Bronze+v2_front.webp',
};

const dummyMatchData: ILatestMatchData = {
  datetime: 'Saturday, 14 Mar 2021 . 01.00 am',
  location: 'Citypark, St. Louis',
  weather: '68°F',
  home_team_name: 'Chelsea',
  home_team_logo_url:
    'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/mls-next-logo.svg',
  home_team_score: 0,
  away_team_name: 'Liverpool',
  away_team_logo_url:
    'https://athletifi-s3.s3.us-east-2.amazonaws.com/logos/vsa-logo.svg',
  away_team_score: 2,
};

const PlayerDashboardPage: NextPage<PageProps> = ({ params }) => {
  const [profile, setProfile] = useState<IProfileProps>(emptyProfileProps);
  const [latestMatch, setLatestMatch] =
    useState<ILatestMatchData>(emptyLatestMatchData);

  useEffect(() => {
    setTimeout(() => {
      setProfile(dummyProfileProps);
      setLatestMatch(dummyMatchData);
    }, 1500);
  }, []);

  const { cardId } = params;
  if (cardId < MIN_PLAYER_ID || cardId > MAX_PLAYER_ID) {
    notFound();
  }

  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] flex justify-center w-full border-collapse">
          <HeroBanner
            name={profile.name}
            playerNumber={profile.playerNumber}
            club={profile.club}
            club_logo={profile.club_logo}
            team={profile.team}
            player_card_url={profile.player_card_url}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col py-3 lg:py-6 mt-10 max-w-[650px] lg:max-w-[1130px] lg:grid md:grid-cols-11">
            <div className="mx-3 lg:col-start-8 lg:col-span-4 lg:my-2 lg:ml-0 lg:mr-6 order-1 lg:order-3">
              <Profile
                age={profile.age}
                club={profile.club}
                league={profile.league}
                team={profile.team}
                ageGroup={profile.ageGroup}
                gender={profile.gender}
                coach={profile.coach}
                bio={profile.bio}
              />
            </div>
            <div className="mb-4 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-2 lg:order-1">
              <LatestMatch
                datetime={latestMatch.datetime}
                location={latestMatch.location}
                weather={latestMatch.weather}
                home_team_name={latestMatch.home_team_name}
                home_team_logo_url={latestMatch.home_team_logo_url}
                home_team_score={latestMatch.home_team_score}
                away_team_name={latestMatch.away_team_name}
                away_team_logo_url={latestMatch.away_team_logo_url}
                away_team_score={latestMatch.away_team_score}
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
