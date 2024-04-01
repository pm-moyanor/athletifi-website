import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import { IRatingProps } from '@/types/Dashboard.type';
import Skeleton from 'react-loading-skeleton';

const StatsBarChartWithNoSSR = dynamic(
  () => import('@/components/dashboard/BarChart'),
  {
    ssr: false,
  },
);

const StatsLineChartWithNoSSR = dynamic(
  () => import('@/components/dashboard/LineChart'),
  { ssr: false },
);

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

const Charts = ({
  overall_rating,
  player_ratings,
  is_goalkeeper,
}: IRatingProps) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [isLatestActive, setIsLatestActive] = useState(true);

  return (
    <>
      {overall_rating ? (
        <div className="stats-chart__container bg-cardsBackground">
          <div className="flex text-sm md:text-md text-white border-b border-gray-500">
            <div
              className={`flex justify-center w-full cursor-pointer rounded-tl-10 py-[14px] ${isLatestActive ? 'font-bold underline' : 'bg-cardsDark'}`}
              onClick={() => setIsLatestActive(true)}
            >
              <p className="px-3">View Latest Stats</p>
              <Image
                alt="bar-chart-icon"
                src={tabInfo[0].icon}
                width={isMobile ? 13 : 17}
                height={isMobile ? 13 : 17}
                quality={75}
                loading="lazy"
                className="stats-chart__icon--white stats-chart__icon--rotate90"
              />
            </div>
            <div
              className={`flex justify-center w-full cursor-pointer rounded-tr-10 py-[14px] ${!isLatestActive ? 'font-bold underline' : 'bg-cardsDark'}`}
              onClick={() => setIsLatestActive(false)}
            >
              <p className="px-3">View Trends</p>
              <Image
                alt="line-chart-icon"
                src={tabInfo[1].icon}
                width={isMobile ? 13 : 17}
                height={isMobile ? 13 : 17}
                quality={75}
                loading="lazy"
                className="stats-chart__icon--white"
              />
            </div>
          </div>
          <section className="flex flex-col items-start h-full min-h-[450px] gap-5 pt-6">
            {isLatestActive ? (
              <StatsBarChartWithNoSSR
                overall_rating={overall_rating}
                player_ratings={player_ratings}
                is_goalkeeper={is_goalkeeper}
              />
            ) : (
              <StatsLineChartWithNoSSR
                overall_rating={overall_rating}
                player_ratings={player_ratings}
                is_goalkeeper={is_goalkeeper}
              />
            )}
          </section>
        </div>
      ) : (
        <Skeleton height={498} borderRadius={10} />
      )}
    </>
  );
};

export default Charts;
