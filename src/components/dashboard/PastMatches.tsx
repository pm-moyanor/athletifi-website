import React from 'react';
import MatchSummary from './MatchSummary';
import { motion } from 'framer-motion';

const PastMatches: React.FC = () => {
  // Dummy match data -- to be defined
  const dummyMatchData = {
    team1Badge: '/vecteezy_crest_1204211.png',
    team2Badge: '/vecteezy_crest_1204211.png',
    team1Name: 'Real Madrid',
    team2Name: 'Barcelona',
    team1Score: 12,
    team2Score: 16,
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

  //// will depend on how past matches data is collected
  const pastMatchesList = [dummyMatchData, dummyMatchData, dummyMatchData];

  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1, // Stagger the children with a delay of 0.5 seconds
      },
    },
  };

  return (
    <div className="w-full px-0 md:px-4 lg:px-0 lg:w-2/3 lg:max-w-[640px]">
      <h2 className="text-primary font-semibold text-2xl mb-6 font-sourceSansPro">
        Past matches
      </h2>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col"
      >
        {pastMatchesList.map((match, index) => (
          <React.Fragment key={index}>
            <motion.div variants={staggerVariants} className="overflow-hidden">
              <MatchSummary matchData={match} />
            </motion.div>
            {index !== pastMatchesList.length - 1 && (
              <motion.span
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
                className="h-px my-4 md:my-6 bg-partnersBorders inline-block min-w-min"
              ></motion.span>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default PastMatches;
