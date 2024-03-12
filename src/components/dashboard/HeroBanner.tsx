import React, { useEffect, useState, useRef } from 'react';
//import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
// import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
//import cardImage from '../../../public/assets/img/png/jose-card-img.png';
import { Player } from '@/types/Player.type';
import { VillanovaIcon } from '@/components/common/Icon';
import CardFlip from './FlipCard';

const playerInformation: Player = {
  club: 'Villanova Soccer Academy',
  name: 'Salvador Carrillo',
  team: '2009',
};

const HeroBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollY = useRef(0); // Ref to store previous scroll position

  const isSmallScreen =
    typeof window !== 'undefined' && window.innerWidth < 640;

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
    <section className="relative px-4 items-center md:items-end flex flex-col-reverse md:flex-row justify-center md:justify-start h-dvh md:h-[435px] lg:h-[370px] w-full md:max-w-[900px] lg:max-w-[1130px]">
      <div className="md:w-2/3 lg:w-2/3 flex items-center lg:items-start justify-center lg:justify-start mb-[10px] md:mb-[50px] lg:mb-[50px] ml-0 md:ml-10 lg:ml-4 pt-6">
        <VillanovaIcon />
        <div className="w-full flex flex-col justify-center items-start ml-2 md:ml-4 pr-0">
          <h2 className="font-SourceSansPro font-bold text-lg md:text-lgl text-primary relative mb-1">
            {playerInformation.name}
          </h2>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {playerInformation.club}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-4 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            {`team ${playerInformation.team}`}
          </p>
          <p className="font-SourceSansPro-Semibold text-sm md:text-base leading-6 text-start text-primary opacity-80 lg:max-w-769 relative z-20">
            #22
          </p>
          <span className="hidden md:block h-px w-full my-4 bg-partnersBorders" />
        </div>
      </div>
      <div className=" -mb-0 md:-mb-10 lg:-mb-[160px]">
        {/* <Image
          className=""
          src={cardImage}
          alt="Player card"
          width={CARD_IMAGE_WIDTH}
          height={CARD_IMAGE_HEIGHT}
          quality={75}
          loading="lazy"
          // layout="responsive"
        /> */}
        <CardFlip />
      </div>

      {/* floating arrow down on mobile to reinforce scroll down */}
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
  );
};

export default HeroBanner;
