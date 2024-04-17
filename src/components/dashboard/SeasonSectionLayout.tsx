import { useState, useEffect } from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';
import {
  IActionReel,
  ISeasonHighlights,
  emptyActionReel,
} from '@/types/Dashboard.type';

const dummyData: IActionReel[] = [
  {
    playback_id: 'qVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    thumbnail: '/poster2.png',
    title: 'Highlight',
    description:
      'Stebi Vidal makes a perfectly timed tackle to win back possession.',
  },
  {
    playback_id: 'qVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    thumbnail: '/poster3.png',
    title: 'Highlight',
    description:
      'Stebi Vidal scores from a free-kick just outside the penalty box.',
  },
  {
    playback_id: 'qVe4r2Bp2BIB7H23i1ZajlCxP47kjRuCusmfUdqc4lc',
    thumbnail: '/poster3.png',
    title: 'Highlight',
    description:
      'Stebi Vidal plays a defense-splitting through ball for an assist',
  },
];

const SeasonSection: React.FC<ISeasonHighlights> = ({
  seasonHighlights,
}: ISeasonHighlights) => {
  const [actionReels, setActionReels] = useState([emptyActionReel]);

  useEffect(() => {
    setTimeout(() => {
      setActionReels(dummyData);
    }, 1500);
  }, []);

  return (
    <>
      <div className="w-full max-w-[1130px] sm:py-8 md:py-20 flex flex-col sm:flex-col md:flex-row justify-around items-center md:items-start">
        <SeasonHighlights seasonHighlights={seasonHighlights} />
        <ActionReelList actionReels={actionReels} />
      </div>
    </>
  );
};

export default SeasonSection;
