import Footer from '@/components/common/Footer';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Seo from '@/components/common/Seo';
import { SEO_CONFIG } from '@/utils/seoConfig';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import { PlayerDashboardProps } from '@/types/Dashboard.type';

import SimpleBarChart from '@/components/dashboard/BarChart';
import LineExample from '@/components/dashboard/LineChart';

const PlayerDashboardPage = ({ cardId }: PlayerDashboardProps) => {
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
      <Seo pageSEO={SEO_CONFIG.dashboard} />
      <div className="overflow-hidden">
        <div className=" about-page__hero-bg bg-no-repeat bg-cover">
          <Header />
          <CommonHero hero={hero} />
        </div>
        <main className="flex flex-col px-3 min-h-full gap-5 m-10 sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl  mx-auto">
          <div className="flex justify-between text-white">
            <div className="">View latest stats
              <Image
                alt="bar chart icon"
                src="/assets/img/svg/chart-simple-solid.svg"
                width={20}
                height={20}
                quality={75}
                loading="lazy"
              />
            </div>
            <div>View trends
              <Image
                alt="bar chart icon"
                src="/assets/img/svg/chart-line-solid.svg"
                width={20}
                height={20}
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
          <section className="flex flex-col justify-center items-stretch lg:flex-row h-full gap-5">
            <SimpleBarChart />
          </section>
          <section className="flex flex-col xl:flex-row justify-center items-stretch flex-grow h-full gap-5 ">
            <LineExample />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PlayerDashboardPage;
