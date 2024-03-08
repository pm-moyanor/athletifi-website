import React from 'react';
import Video from 'next-video';

interface ActionReelProps {
  videoSrc: string;
  thumbnail: string;
  title: string;
  description: string;
}
const ActionReel: React.FC<ActionReelProps> = ({
  videoSrc,
  thumbnail,
  title,
  description,
}) => {
  return (
    <div className=" flex my-3 justify-start">
      <div className="relative w-full max-w-[230px] min-w-[180px] h-[130px] sm:h-[130px] md:h-[120px]">
        {/* <video
          className="w-full h-full object-cover rounded rounded-5"
          src={videoSrc}
          poster={thumbnail}
        />
         */}
        <Video src={videoSrc} />
        {/* <time className="absolute bottom-2 right-2 bg-black text-primary px-1.5 text-sm font-light">
          00:00
        </time> */}
      </div>
      <div className=" ml-2 flex flex-col justify-end w-full min-w-[130px] max-w-[220px]">
        <h4 className="text-sm font-semibold mb-2 text-primary font-sourceSansPro">
          {title}
        </h4>
        <p className="text-sm text-primary font-extralight font-sourceSansPro mb-px">
          {description}
        </p>
      </div>
    </div>
  );
};

interface ActionReelListProps {
  actionReels: ActionReelProps[];
}

const ActionReelList: React.FC<ActionReelListProps> = ({ actionReels }) => {
  return (
    <div className="border-l-0 border-partnersBorders md:border-l flex flex-col items-start md:items-center w-full md:w-1/2 max-w-[560px] px-0 md:px-4 py-6 md:py-0">
      <div className=" flex flex-col md:overflow-auto h-[460px] items-center">
        <h3 className="w-full text-primary text-md font-semibold font-sourceSansPro mb-4">
          Top Action Reels
        </h3>
        {actionReels.map((actionReel, index) => (
          <ActionReel key={index} {...actionReel} />
        ))}
      </div>
    </div>
  );
};

export { ActionReel, ActionReelList };
