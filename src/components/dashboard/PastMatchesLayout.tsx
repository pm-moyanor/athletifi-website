import React from 'react';
import PastMatches from './PastMatches';
import Teammates from './Teammates';

const teammates = [
  {
    id: 1,
    name: 'David Rodriguez',
    avatar: 'david-rodriguez-avatar.jpg',
    playerNumber: 10,
  },
  {
    id: 2,
    name: 'Sophia Nguyen',
    avatar: 'sophia-nguyen-avatar.jpg',
    playerNumber: 7,
  },
  {
    id: 3,
    name: 'Liam Wilson',
    avatar: 'liam-wilson-avatar.jpg',
    playerNumber: 22,
  },
  {
    id: 4,
    name: 'Isabella Garcia',
    avatar: 'isabella-garcia-avatar.jpg',
    playerNumber: 14,
  },
];

const PastMatchesLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full p-4 md:p-6  max-w-[1030px]">
        <PastMatches />
        <Teammates teammates={teammates} />
      </div>
    </div>
  );
};

export default PastMatchesLayout;
