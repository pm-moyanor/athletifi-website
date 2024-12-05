import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

// Types
interface Match {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  score: {
    home: number;
    away: number;
  };
  date: string;
  time: string;
  status:
    | 'analysis complete'
    | 'more info needed'
    | 'footage needed'
    | 'footage processing';
}

// Mock match data
const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: {
      name: 'Team 2016 Villanova',
      logo: '/api/placeholder/40/40',
    },
    awayTeam: {
      name: 'Liverpool',
      logo: '/api/placeholder/40/40',
    },
    score: {
      home: 0,
      away: 1,
    },
    date: 'Saturday, 14 Mar 2021',
    time: '01:00 am',
    status: 'analysis complete',
  },
  {
    id: '2',
    homeTeam: {
      name: 'Chelsea',
      logo: '/api/placeholder/40/40',
    },
    awayTeam: {
      name: 'Team 2016',
      logo: '/api/placeholder/40/40',
    },
    score: {
      home: 0,
      away: 1,
    },
    date: 'Saturday, 14 Mar 2021',
    time: '01:00 am',
    status: 'more info needed',
  },
  {
    id: '3',
    homeTeam: {
      name: 'Barcelona',
      logo: '/api/placeholder/40/40',
    },
    awayTeam: {
      name: 'Team 2016',
      logo: '/api/placeholder/40/40',
    },
    score: {
      home: 0,
      away: 1,
    },
    date: 'Saturday, 14 Mar 2021',
    time: '01:00 am',
    status: 'footage needed',
  },
  {
    id: '4',
    homeTeam: {
      name: 'Real Madrid',
      logo: '/api/placeholder/40/40',
    },
    awayTeam: {
      name: 'Team 2016',
      logo: '/api/placeholder/40/40',
    },
    score: {
      home: 0,
      away: 1,
    },
    date: 'Saturday, 14 Mar 2021',
    time: '01:00 am',
    status: 'footage processing',
  },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: Match['status'] }> = ({ status }) => {
  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'analysis complete':
        return 'bg-[#41985A]';
      case 'more info needed':
        return 'bg-chartRed';
      case 'footage needed':
        return 'bg-[#B47E16]';
      case 'footage processing':
        return 'bg-chartPurple';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span
      className={`${getStatusColor(status)} text-center text-sm py-[2px] px-4 rounded-md w-36 absolute top-2 right-2 md:relative md:top-auto md:right-auto md:mx-auto`}
    >
      {status}
    </span>
  );
};

// Match Card Component
const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <div className="w-full border-t border-partnersBorders border-opacity-50 min-h-72 md:min-h-40 flex flex-col justify-between py-4 md:py-6 px-2">
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-between my-4 w-full gap-8 md:gap-0 mt-20">
        {/* Teams and Score */}
        <div className="flex items-center justify-between min-w-[216px]">
          <div className="flex items-center space-x-2">
            <Image
              src={match.homeTeam.logo}
              alt={match.homeTeam.name}
              width={80}
              height={80}
              className="w-16 h-16 bg-partnersBorders"
            />
          </div>
          <div className="text-white text-lg font-bold">
            {match.score.home} - {match.score.away}
          </div>
          <div className="flex items-center space-x-2">
            <Image
              src={match.awayTeam.logo}
              alt={match.awayTeam.name}
              width={80}
              height={80}
              className="w-16 h-16 bg-partnersBorders"
            />
          </div>
        </div>

        {/* Match Details */}

        <div className="flex flex-col gap-2 mb-2 max-w-96 flex-2">
          {/* Status Badge positioned here for md screens */}
          <div className="hidden md:block">
            <StatusBadge status={match.status} />
          </div>

          <div className="text-md w-64 flex gap-[4px] flex-col items-center md:items-start md:flex-row">
            <span className="text-white truncate">{match.homeTeam.name}</span>
            <span className="text-skyblue text-md">vs</span>
            <span className="text-white truncate">{match.awayTeam.name}</span>
          </div>

          <div className="text-gray-400 mx-auto text-sm mt-8 md:mt-0 md:mx-0">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            {match.date} · {match.time}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-center">
          <button className="w-full max-w-60 md:w-40 bg-darkerSkyBlue hover:bg-cardsBackground text-sm text-gray-950 py-2 rounded-full">
            more details
          </button>
        </div>

        {/* Status Badge positioned here for mobile */}
        <div className="md:hidden">
          <StatusBadge status={match.status} />
        </div>
      </div>
    </div>
  </div>
);

// Matches View Component
const MatchesView: React.FC = () => {
  const [searchQuery] = useState('');

  const filteredMatches = useMemo(() => {
    return mockMatches.filter((match) => {
      const searchTerm = searchQuery.toLowerCase();
      return (
        match.homeTeam.name.toLowerCase().includes(searchTerm) ||
        match.awayTeam.name.toLowerCase().includes(searchTerm) ||
        match.date.toLowerCase().includes(searchTerm)
      );
    });
  }, [searchQuery]);

  return (
    <div className="w-full px-4 lg:px-6">
      <header className="flex items-center justify-between mb-8">
        <div className="ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="w-full border border-partnersBorders bg-cardsBackground text-white px-4 py-2 rounded-full pl-10"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-[14px] w-4 h-4 text-gray-400"
            />
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesView;
