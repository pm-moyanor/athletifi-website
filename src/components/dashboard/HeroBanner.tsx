import Image from 'next/image';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import FlipCard from '@/components/dashboard/FlipCard';
import { useDashboardData } from '@/states/dashboardStore';
import { useParams } from 'next/navigation';

const HeroBanner: React.FC = () => {
  const { cardId } = useParams();
  const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;
  const { dashboardData } = useDashboardData(cardIdValue);

  const playerProfile = dashboardData.data?.playerProfile;

  const [isVisible, setIsVisible] = useState(true);
  const previousScrollY = useRef(0); // Ref to store previous scroll position

  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // check screensize to render arrow down on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > previousScrollY.current;

      if (scrolledDown && currentScrollY > 100 && isVisible) {
        // Hide icon if scrolled down
        setIsVisible(false);
      }
      previousScrollY.current = currentScrollY; // Update previous scroll position
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Scroll onclick the screen down by one screen height
  const handleIconClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const status = 'guest'; //  'owner' t test the owner label
  return (
    <SkeletonTheme baseColor="#113448" highlightColor="#525252">
<<<<<<< HEAD
      <section className="relative items-center md:items-start flex flex-col-reverse md:flex-row justify-center md:justify-start h-dvh md:h-[420px] lg:h-[370px] w-full md:max-w-[860px] lg:max-w-[1130px] px-4 md:px-8">
        {playerProfile?.club_logo ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className=" md:w-2/3 lg:w-2/3 flex items-center justify-center lg:justify-start mb-[10px] md:mt-[200px] lg:mb-[50px] max-w-[700px]"
          >
            <div className="relative w-[120px] md:w-[150px] h-[120px] md:h-[150px] min-w-[100px]  flex justify-center items-center">
              <Image
                alt="club-logo"
                src={playerProfile?.club_logo}
                layout="fill"
              />
            </div>

            <div className="flex flex-col justify-center items-start pl-2  md:w-full max-w-[576px] tracking-wide">
              <h2 className=" font-bold text-lgl text-primary relative tracking-wide">
                {playerProfile?.name}
              </h2>
              <p className="text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative ">
                {playerProfile?.club}
              </p>
              <p className="text-base leading-4 text-start text-primary opacity-80 lg:max-w-769 relative ">
                {`team ${playerProfile?.team}`}
              </p>
              <p className="text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative ">
                {`#${playerProfile?.number}`}
              </p>
              <span className="hidden md:block h-px w-full my-2 bg-partnersBorders" />
            </div>
          </motion.div>
=======
      <section className="relative items-center md:items-end flex flex-col-reverse md:flex-row justify-center md:justify-betweenh-screen md:h-[420px] lg:h-[370px] w-full md:max-w-[800px] lg:max-w-[1130px] px-6 ">
        {playerProfile?.club_logo ? (
          <div className="w-full flex flex-col md:flex-grow md:items-start lg:max-w-[640px]">
            {cardId && (
              <div className="flex mb-2 justify-center">
                <h2 className="text-primary text-[20px] font-semibold">
                  Card #{cardId[1]}
                </h2>
                <div
                  className={`px-4 h-[30px] rounded-[5px] ml-3 flex items-center ${
                    status === 'guest' ? 'bg-chartOrange' : 'bg-chartBlue'
                  }`}
                >
                  <p className=" text-primary">
                    {status === 'guest' ? 'Guest access' : 'Owner'}
                  </p>
                </div>
              </div>
            )}
            <span className="block h-px w-full bg-partnersBorders my-[4px]" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeIn' }}
              className=" flex items-center justify-center mb-12 md:mb-4 max-w-[700px] gap-[4px] tracking-wide"
            >
              <div className="relative w-[130px] h-[130px] min-w-[120px] flex justify-center items-center">
                <Image
                  alt="club-logo"
                  src={playerProfile?.club_logo}
                  layout="fill"
                />
              </div>

              <div className="flex flex-col justify-center items-start ">
                <h2 className=" font-bold text-[28px] md:text-lg2xl text-primary relative">
                  {playerProfile?.name}
                </h2>
                <div className="flex flex-col justify-start leading-4 gap-2">
                  <p className="text-base text-start text-primary font-light ">
                    {playerProfile?.club}
                  </p>
                  <p className="text-base text-start text-primary font-light ">
                    {`team ${playerProfile?.team}`}
                  </p>
                  <p className="text-base text-start text-primary font-light ">
                    {`#${playerProfile?.number}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
>>>>>>> bfd9b68a4470431195e3b3b4acf06b22cdc0e150
        ) : (
          <div className="w-full h-1"></div>
        )}

        {playerProfile?.card_url ? (
          <div className="md:-mb-[50px] lg:-mb-[255px]">
            <FlipCard cardUrl={playerProfile?.card_url} />
          </div>
        ) : (
          <div className="mb-20 mt-100">
            <div className="flex items-center">
              <Skeleton
                className="min-w-[350px] min-h-[350px] md:min-w-[320px] md:min-h-[320px] lg:min-h-[420px] lg:min-w-[420px]"
                circle
              />
            </div>
          </div>
        )}
        {isSmallScreen && (
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="w-full text-primary opacity-80 absolute bottom-4 left-0 z-40 flex justify-center"
              >
                <motion.div
                  onClick={handleIconClick}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0.8, y: [0, -4, 0] }}
                  exit={{ opacity: 0.8 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <FontAwesomeIcon icon={faChevronDown} size="2xl" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>
    </SkeletonTheme>
  );
};

export default HeroBanner;
