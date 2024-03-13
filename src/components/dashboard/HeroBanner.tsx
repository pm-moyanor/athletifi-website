import Image from 'next/image';
import { useMediaQuery } from '@/app/utils/useMediaQuery';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
//import cardImage from '../../../public/assets/img/png/jose-card-img.png';
import { IProfileProps } from '@/types/Dashboard.type';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
// import { VillanovaIcon } from '@/components/common/Icon';
import FlipCard from './FlipCard';

const HeroBanner: React.FC<IProfileProps> = ({
  name,
  playerNumber,
  club,
  club_logo,
  team,
  player_card_url,
}: IProfileProps) => {
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
  }, []);

  // Scrollk onclick the screen down by one screen height
  const handleIconClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <SkeletonTheme baseColor="#113448" highlightColor="#525252">
      <section className="relative px-4 items-center md:items-end flex flex-col-reverse md:flex-row justify-center md:justify-start h-dvh md:h-[380px] lg:h-[370px] w-full md:max-w-[900px] lg:max-w-[1130px]">
        <div
          className={`${club_logo ? 'opacity-100' : 'opacity-0'} md:w-3/4 flex items-start justify-center lg:justify-start mb-[10px] md:mb-[50px] lg:mb-[30px] ml-0 md:ml-10 lg:ml-4 pt-6`}
        >
          {/* <VillanovaIcon /> */}
          {club_logo ? (
            <Image
              className="pt-2"
              alt="club-logo"
              src={club_logo}
              width={130}
              height={130}
            />
          ) : (
            <div className="pt-2">
              <Skeleton circle width={100} height={100} />
            </div>
          )}

          <div className="w-full flex flex-col justify-center items-start ml-2 md:ml-4 pr-0 md:pr-6">
            <h2 className="font-SourceSansPro font-bold text-lg md:text-lgl text-primary relative mb-1 min-w-[256px]">
              {name ? name : <Skeleton />}
            </h2>
            <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20 min-w-[256px]">
              {club || <Skeleton />}
            </p>
            <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-4 text-start text-primary opacity-80 lg:max-w-769 relative z-20 min-w-[256px]">
              {team ? `team ${team}` : <Skeleton />}
            </p>
            <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20 min-w-[256px]">
              {playerNumber ? `#${playerNumber}` : <Skeleton />}
            </p>
            <span className="hidden md:block h-px w-full my-4 bg-partnersBorders" />
          </div>
        </div>

        <div className="-mb-0 md:-mb-10 lg:-mb-[160px]">
          {player_card_url ? (
            // <Image
            //   className=""
            //   src={cardImage}
            //   alt="Player card"
            //   width={CARD_IMAGE_WIDTH}
            //   height={CARD_IMAGE_HEIGHT}
            //   quality={75}
            //   loading="lazy"
            // />
            <FlipCard />
          ) : (
            <div className="flex items-center">
              <Skeleton
                className="min-w-[340px] min-h-[340px] md:min-w-[320px] md:min-h-[320px] lg:min-h-[400px] lg:min-w-[400px]"
                circle
              />
            </div>
          )}
          {/* <Image
            className=""
            src={cardImage}
            alt="Player card"
            width={CARD_IMAGE_WIDTH}
            height={CARD_IMAGE_HEIGHT}
            quality={75}
            loading="lazy"
          /> */}
        </div>
        {isSmallScreen && (
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="w-full text-primary opacity-80 absolute bottom-0 left-0 mb-12 z-40 flex justify-center"
              >
                <motion.div
                  onClick={handleIconClick}
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0.8, y: [0, -5, 0] }}
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
