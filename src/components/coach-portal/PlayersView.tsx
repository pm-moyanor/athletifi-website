import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSearch } from '@fortawesome/free-solid-svg-icons';

// Types
interface PlayerStats {
  mentality: number;
  attacking: number;
  skill: number;
  physical: number;
  defending: number;
}

interface Player {
  id: string;
  avatar: string;
  name: string;
  number: string;
  stats: PlayerStats;
  status: string[];
}

// Mock data
const mockPlayers: Player[] = [
  {
    id: '1',
    avatar: '/api/placeholder/40/40',
    name: 'Joseph Valdez',
    number: '#08',
    stats: {
      mentality: 40,
      attacking: 86,
      skill: 78,
      physical: 36,
      defending: 54,
    },
    status: ['card pending'],
  },
  {
    id: '2',
    avatar: '/api/placeholder/40/40',
    name: 'Salvador Carrillo',
    number: '#08',
    stats: {
      mentality: 40,
      attacking: 86,
      skill: 78,
      physical: 36,
      defending: 54,
    },
    status: ['goalkeeper', 'active'],
  },
  {
    id: '3',
    avatar: '/api/placeholder/40/40',
    name: 'David Calderon',
    number: '#08',
    stats: {
      mentality: 40,
      attacking: 86,
      skill: 78,
      physical: 36,
      defending: 54,
    },
    status: ['injured', 'dribbler'],
  },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-[#41985A]';
      case 'injured':
        return 'bg-chartRed';
      case 'goalkeeper':
        return 'bg-chartPurple';
      case 'dribbler':
        return 'bg-[#3184BD]';
      case 'card pending':
        return 'bg-[#B47E16]';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span
      className={`${getStatusColor(status)} text-white text-sm py-[2px] px-4 rounded-md`}
    >
      {status}
    </span>
  );
};

// Stat Display Component
const StatDisplay: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col items-center">
    <span className="text-[20px] md:text-2xl font-semibold text-white">
      {value}
    </span>
    <span className="text-xs text-gray-400">{label}</span>
  </div>
);

// Player Card Component
const PlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <div className=" border-t border-partnersBorders flex flex-col justify-between py-4 px-2">
    <div className="flex items-center justify-between mb-4">
      <div className="flex w-full justify-between items-start flex-wrap-reverse gap-2">
        <div className="flex items-center flex-wrap gap-4 md:gap-3 mt-6 mb-8 md:mb-0 max-w-72">
          <Image
            src={player.avatar}
            alt={player.name}
            width={80}
            height={80}
            className="rounded-full bg-slate-600"
          />
          <div>
            <div className="flex gap-2 mb-2">
              {player.status.map((status, index) => (
                <StatusBadge key={index} status={status} />
              ))}
            </div>
            <h3 className="text-white font-semibold text-basemd">
              {player.name}
            </h3>
            <span className="text-gray-400 text-base">{player.number}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white ml-auto mb-auto">
          <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
          <span className="text-gray-400 mx-[4px] text-sm">Edit</span>
        </button>
      </div>
    </div>
    <div className="flex justify-end flex-col items-end">
      <div className="flex justify-between mb-6 w-full md:min-w-96 max-w-96">
        <StatDisplay label="mentality" value={player.stats.mentality} />
        <StatDisplay label="attacking" value={player.stats.attacking} />
        <StatDisplay label="skill" value={player.stats.skill} />
        <StatDisplay label="physical" value={player.stats.physical} />
        <StatDisplay label="defending" value={player.stats.defending} />
      </div>

      <button className="w-40 bg-darkerSkyBlue hover:bg-cardsBackground text-sm text-gray-950 py-2 rounded-full">
        go to dashboard
      </button>
    </div>
  </div>
);

// Main Dashboard Component
const TeamDashboard: React.FC = () => (
  <div className=" bg-cardsDark min-h-screen w-full">
    <div className=" w-full p-2 md:p-6">
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
        {mockPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  </div>
);

export default TeamDashboard;
