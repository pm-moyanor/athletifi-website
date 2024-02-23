import React from 'react';

interface ActionReelProps {
  videoSrc: string;
  title: string;
  description: string;
}

const ActionReel: React.FC<ActionReelProps> = ({
  videoSrc,
  title,
  description,
}) => {


  return (
    <div className=" border flex my-2 justify-start">
      <div className="relative w-full max-w-[240px] min-w-[180px] h-40">
        <video className="w-full h-full object-cover rounded rounded-5" src={videoSrc} controls />
        <time className="absolute bottom-2 right-2 bg-black text-primary px-1.5 text-sm font-light">
          00:00
        </time>
      </div>
      <div className=" ml-2 flex flex-col justify-end w-[230px]">
        <h4 className="text-sm font-semibold mb-2 text-primary font-sourceSansPro">{title}</h4>
        <p className="text-sm text-primary font-extralight font-sourceSansPro mb-px">{description}</p>
      </div>
    </div>
  );
};

interface ActionReelListProps {
  actionReels: ActionReelProps[];
}

const ActionReelList: React.FC<ActionReelListProps> = ({ actionReels }) => {
  return (
    <div className="flex flex-col items-center border w-2/3 md:w-1/2">
      <h3 className="w-full text-primary pt-2 text-md font-semibold font-sourceSansPro my-4">
        Top Action Reels
      </h3>
      <div className=" flex flex-col overflow-auto h-[500px]">
        {actionReels.map((actionReel, index) => (
          <ActionReel key={index} {...actionReel} />
        ))}
      </div>
    </div>
  );
};

export { ActionReel, ActionReelList };
