import React from 'react';
import MatchSummary from './MatchSummary';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { IPastMatches } from '@/types/Dashboard.type';

const PastMatches: React.FC<IPastMatches> = ({
  past_matches,
}: IPastMatches) => {
  //check if in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.7,
    triggerOnce: true,
  });

  //varints to trigger animations with staggered effect
  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      {past_matches && past_matches[0]?.home_club_logo ? (
        <div className="w-full px-0 md:px-4 lg:px-0 lg:w-2/3 lg:max-w-[720px]  fixed-height h-full">
          <h2 className="text-primary font-semibold text-2xl mb-6 font-sourceSansPro">
            Past matches
          </h2>
          <motion.div
            ref={inViewRef}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerVariants}
            className="flex flex-col"
          >
            {past_matches.map((match, index) => (
              <React.Fragment key={index}>
                <motion.div
                  variants={staggerVariants}
                  className="overflow-hidden"
                >
                  <MatchSummary matchData={match} />
                </motion.div>
                {index !== past_matches.length - 1 && (
                  <motion.span
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={staggerVariants}
                    className="h-px my-4 md:my-6 bg-partnersBorders inline-block min-w-min"
                  ></motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      ) : past_matches === null ? (
        <div className="w-full px-0 md:px-4 lg:px-0 lg:w-2/3 lg:max-w-[640px]">
          <h2 className="text-primary font-semibold text-2xl mb-6">
            Past matches
          </h2>
          <div className="text-gray-500 min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[50px] mb-10 lg:mb-0">
            We are working on getting more match data for your player. Please
            come back soon!
          </div>
        </div>
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[550px] md:min-h-[355px] mb-10 lg:mb-0" />
      )}
    </>
  );
};

export default PastMatches;
