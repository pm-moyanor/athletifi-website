import React, { useState, useEffect }, { useRef } from 'react';
import MatchSummary from './MatchSummary';
import Skeleton from 'react-loading-skeleton';
import { IMatchData, emptyMatchData } from '@/types/Dashboard.type';
import { motion, useInView } from 'framer-motion';

const dummyMatchData: IMatchData = {
  team1Badge: '/vecteezy_crest_1204211.png',
  team2Badge: '/vecteezy_crest_1204211.png',
  team1Name: 'Real Madrid',
  team2Name: 'Barcelona',
  team1Score: 2,
  team2Score: 1,
  date: 'Saturday, 14 March 2022, 12:00pm',
  location: 'Citypark, St. Louis',
  weather: '68°F', //resolve logic for getting the weather
  fullRecapVideo: {
    title: 'Full Match Recap',
    url: 'full-match-recap.mp4',
    thumbnail: 'full-match-recap-thumbnail.jpg',
    description:
      'Watch the full recap of the match between Real Madrid and Barcelona.',
  },
  videos: [
    {
      title: 'Match Highlights',
      url: 'match-highlights.mp4',
      thumbnail: 'match-thumbnail.jpg',
      description:
        'Highlights from the match between Real Madrid and Barcelona.',
    },
    {
      title: 'Player Interviews',
      url: 'player-interviews.mp4',
      thumbnail: 'interviews-thumbnail.jpg',
      description: 'Post-match interviews with players from both teams.',
    },
    {
      title: 'Goal of the Match',
      url: 'goal-of-the-match.mp4',
      thumbnail: 'goal-thumbnail.jpg',
      description: 'Watch the best goal from the match!',
    },
  ],
};

const pastMatchesList = [dummyMatchData, dummyMatchData, dummyMatchData];

const PastMatches: React.FC = () => {
  const [pastMatches, setPastMatches] = useState([emptyMatchData]);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.7, once: true });

  useEffect(() => {
    setTimeout(() => {
      setPastMatches(pastMatchesList);
    }, 1500);
  }, []);


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
      {pastMatches[0]?.team1Badge ? (
        <div className="w-full px-0 md:px-4 lg:px-0 lg:w-2/3 lg:max-w-[640px]">
          <h2 className="text-primary font-semibold text-2xl mb-6 font-sourceSansPro">
            Past matches
          </h2>
          <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={staggerVariants}
        className="flex flex-col"
      >
            {pastMatches.map((match, index) => (
                  <React.Fragment key={index}>
                <motion.div variants={staggerVariants} className="overflow-hidden">
              <MatchSummary matchData={match} />
                </motion.div>
            {index !== pastMatches.length - 1 && (
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
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[640px] min-h-[530px] md:min-h-[355px] lg:min-h-[355px] mb-10 lg:mb-0" />
      )}
    </>
  );
};

export default PastMatches;
