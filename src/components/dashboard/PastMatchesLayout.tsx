import React from 'react';
import PastMatches from './PastMatches';
import Teammates from './Teammates';

const teammates = [
  {
    id: 1,
    name: 'David Rodriguez',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 10,
  },
  {
    id: 2,
    name: 'Sophia Nguyen',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 7,
  },
  {
    id: 3,
    name: 'Liam Wilson',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 22,
  },
  {
    id: 4,
    name: 'Isabella Garcia',
    avatar: '/vecteezy_male-3d-avatar_27245487.png',
    playerNumber: 14,
  },
];

const PastMatchesLayout: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between mt-6 mb-6 items-center md:items-start w-11/12 max-w-[1130px] ">
      <PastMatches />
      <Teammates teammates={teammates} />
    </div>
  );
};

export default PastMatchesLayout;
