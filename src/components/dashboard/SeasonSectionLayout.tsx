import { useState, useEffect } from 'react';
import SeasonHighlights from './SeasonHighlights';
import { ActionReelList } from './TopActionReels';
import { IActionReel, emptyActionReel } from '@/types/Dashboard.type';

const dummyData: IActionReel[] = [
  // {
  //   video_key:
  //     'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  //   thumbnail: '/poster2.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
  // {
  //   video_key: '/video2.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
  // {
  //   video_key: '/video3.mp4',
  //   thumbnail: '/poster3.png',
  //   title: 'Highlight',
  //   description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  // },
];

const SeasonSection: React.FC = () => {
  const [actionReels, setActionReels] = useState([emptyActionReel]);

  useEffect(() => {
    setTimeout(() => {
      setActionReels(dummyData);
    }, 1500);
  }, []);

  return (
    <>
      <div className="w-full max-w-[1130px] sm:py-8 md:py-20 flex flex-col sm:flex-col md:flex-row justify-around items-center md:items-start tracking-wide">
        <SeasonHighlights />
        <ActionReelList actionReels={actionReels} />
        {/* once actionReels are
        ready, we could implement jotai */}
      </div>
    </>
  );
};

export default SeasonSection;
