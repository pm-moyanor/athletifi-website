'use client';

import { useState } from 'react';
import Footer from '@/components/common/Footer';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import { PlayerDashboardProps } from '@/types/Dashboard.type';
import Highlights from '@/components/dashboard/Highlights';
import Teammates from '@/components/dashboard/Teammates';
import HeroBanner from '@/components/dashboard/HeroBanner';
// import PlayerStats from '@/components/dashboard/PlayerStats';
// import PlayerInfo from '@/components/dashboard/PlayerInfo';
// import PlayerCard from '@/components/dashboard/PlayerCard';
import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import SeasonSection from '@/components/dashboard/SeasonSectionLayout';
import PastMatchesLayout from '@/components/dashboard/PastMatchesLayout';
import SimpleBarChart from '@/components/dashboard/BarChart';
import LineExample from '@/components/dashboard/LineChart';
// import { PlayerDashboardProps } from '@/types/Dashboard.type';
import styled from 'styled-components';

const Tab = styled.button<{ $primary?: boolean }>`
  width: 100%;
  border-radius: ${(props) => (props.$primary ? '25px 0 0 0' : '0 25px 0 0')};
  color: white;
  font-size: 16px;
  padding: 16px 60px;
  cursor: pointer;
  background: rgba(17, 52, 72);
  border: 0;
  border-bottom: 1px solid gray;
  outline: 0;
  ${({ active }) =>
    active &&
    `
  font-weight: bold;
  background: rgba(17, 52, 72, 0);
  text-decoration: underline;
`}
`;
const ButtonGroup = styled.div`
  display: flex;
`;

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

const tabInfo = [
  {
    type: 'latest',
    title: 'View Latest Stats',
    icon: '/assets/img/svg/chart-simple-solid.svg',
  },
  {
    type: 'trend',
    title: 'View Trends',
    icon: '/assets/img/svg/chart-line-solid.svg',
  },
];
const PlayerDashboardPage: NextPage<PageProps> = ({
  cardId,
}: PlayerDashboardProps) => {
  const [active, setActive] = useState(tabInfo[0].type);
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
        <div className=" about-page__hero-bg bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <main className="flex flex-col px-3 min-h-full gap-5 m-10 sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto">
          <div className="stats-chart__container">
            <ButtonGroup>
              <Tab
                $primary
                active={active === tabInfo[0].type}
                onClick={() => setActive(tabInfo[0].type)}
              >
                <div className="flex justify-center w-10">
                  <div className="px-3">{tabInfo[0].title}</div>
                  <Image
                    alt="bar chart icon"
                    src={tabInfo[0].icon}
                    width={20}
                    height={20}
                    quality={75}
                    loading="lazy"
                    className="stats-chart__icon--white stats-chart__icon--rotate90"
                  />
                </div>
              </Tab>
              <Tab
                active={active === tabInfo[1].type}
                onClick={() => setActive(tabInfo[1].type)}
              >
                <div className="flex justify-center w-10">
                  <div className="px-3">{tabInfo[1].title}</div>
                  <Image
                    alt="line chart icon"
                    src={tabInfo[1].icon}
                    width={20}
                    height={20}
                    quality={75}
                    loading="lazy"
                    className="stats-chart__icon--white"
                  />
                </div>
              </Tab>
            </ButtonGroup>
            <section className="flex flex-col items-start h-full gap-5 pt-6">
              {active === tabInfo[0].type ? (
                <SimpleBarChart />
              ) : (
                <LineExample />
              )}
              <div className="flex items-center justify-between h-full">
                <div className="stats-chart__rating-container">
                  <div className="">Rating</div>
                  <div className="stats-chart__rating">72</div>
                </div>
                {/* <div className="bg-white p-5">DESCRIPTION TEXT CAN GO HERE</div> */}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
