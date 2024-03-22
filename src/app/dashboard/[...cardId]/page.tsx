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

import Navbar from '@/components/dashboard/NavBar';
import BackToTop from '@/components/common/BackToTop';

import { DashboardData, emptyDashboardData } from '@/types/Dashboard.type';

interface PageProps {
  params: { cardId: string | number };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
const testAWSFetch = async (cardId: string) => {
  const response = await fetch(`${baseURL}/dashboard/${cardId}`);
  const data = await response.json();
  if (!cardId || !data) {
    return notFound();
  }
  console.log(data);
  return data;
};

const PlayerDashboardPage: NextPage<PageProps> = () => {
  const [dashboardData, setDashboardData] =
    useState<DashboardData>(emptyDashboardData);
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;

  useEffect(() => {
    testAWSFetch(cardIdValue as string)
      .then((data) => {
        const playerRatings = Object.keys(data[1].result)
          .filter((x) => x !== 'name')
          .map((attr) => {
            return {
              attribute: attr,
              rating: Math.trunc(data[1].result[attr]),
            };
          });
        const overallRating = Math.round(
          playerRatings.reduce((a, b) => a + b.rating, 0) /
            playerRatings.length,
        );
        const dataObject = {
          latestMatch: data[0].result,
          latestPlayerRating: playerRatings,
          overallRating: overallRating,
          matchesList: data[2].result,
          playerProfile: data[3].result,
          teammates: data[4].result,
        };
        setDashboardData(dataObject);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
      });
  }, [cardIdValue]);

  return (
    <>
      <div className="overflow-hidden">
        <Navbar />
        <div className="bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] flex justify-center w-full border-collapse">
          <HeroBanner
            name={dashboardData?.playerProfile.name}
            number={dashboardData?.playerProfile.number}
            club={dashboardData?.playerProfile.club}
            club_logo={dashboardData?.playerProfile.club_logo}
            team={dashboardData?.playerProfile.team}
            card_url={dashboardData?.playerProfile.card_url}
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
                age_group={dashboardData?.playerProfile.age_group}
                gender={dashboardData?.playerProfile.gender}
                coach={dashboardData?.playerProfile.coach}
                bio={dashboardData?.playerProfile.bio}
              />
            </div>
            <div className="mb-4 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-2 lg:order-1">
              <LatestMatch
                match_id={dashboardData?.latestMatch.match_id}
                datetime={dashboardData?.latestMatch.datetime}
                location={dashboardData?.latestMatch.location}
                weather={dashboardData?.latestMatch.weather}
                home_club={dashboardData?.latestMatch.home_club}
                home_club_logo={dashboardData?.latestMatch.home_club_logo}
                home_score={dashboardData?.latestMatch.home_score}
                away_club={dashboardData?.latestMatch.away_club}
                away_club_logo={dashboardData?.latestMatch.away_club_logo}
                away_score={dashboardData?.latestMatch.away_score}
              />
            </div>
            <div className="mb-3 mx-3 lg:col-start-1 lg:col-span-7 lg:my-2 lg:mx-4 order-3 lg:order-2">
              <Charts
                overallRating={dashboardData?.overallRating}
                player_ratings={dashboardData?.latestPlayerRating}
              />
            </div>
          </div>
        </div>
        <main className="flex flex-col items-center bg-gradient-to-l from-cardsBackground via-[#032436]  to-[#032436] bg-opacity-95">
          <SeasonSection />
          <span className="h-px bg-partnersBorders w-11/12 max-w-[1130px] my-8 md:my-4" />
          <PastMatchesLayout
            past_matches={dashboardData?.matchesList}
            teammates={dashboardData?.teammates}
          />
        </main>
        <BackToTop />
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
