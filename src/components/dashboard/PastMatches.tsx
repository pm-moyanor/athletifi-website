import React from 'react';
import MatchSummary from './MatchSummary';

const PastMatches: React.FC = () => {
  // Dummy match data -- to be defined
  const dummyMatchData = {
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

  //// will depend on how past matches data is collected
  const pastMatchesList = [dummyMatchData, dummyMatchData, dummyMatchData];

  return (
    <div className=" p-2 max-w-none sm:max-w-none md:max-w-[620px]">
      <h2 className="text-primary font-semibold text-2xl my-4 font-sourceSansPro">
        Past matches
      </h2>
      <div className="flex flex-col pt-2">
        {pastMatchesList.map((match, index) => (
          //  replace keys when data is integrated
          <React.Fragment key={index}>
            <MatchSummary matchData={match} />
            {index !== pastMatchesList.length - 1 && (
              <span className="h-px my-4 md:my-6 bg-partnersBorders inline-block min-w-min" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PastMatches;
