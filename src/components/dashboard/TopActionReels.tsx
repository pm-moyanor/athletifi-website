import { IActionReel } from '@/types/Dashboard.type';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Video from 'next-video';

const ActionReel: React.FC<IActionReel> = ({
  video_url,
  thumbnail,
  title,
  description,
}) => {
  return (
    <div className=" flex my-2 justify-start">
      <div className="relative w-full max-w-[230px] min-w-[180px] h-[120px] sm:h-[120px] md:h-[130px]">
        {video_url && thumbnail && (
          <Video
            className="w-full h-full object-cover rounded rounded-5"
            src={video_url}
            poster={thumbnail}
          />
        )}
        <time className="absolute bottom-2 right-2 bg-black text-primary px-1.5 text-sm font-light">
          00:00
        </time>
      </div>
      <div className=" ml-2 flex flex-col justify-end w-full min-w-[130px] md:max-w-[230px]">
        <h4 className="text-sm font-semibold mb-2 text-primary font-sourceSansPro">
          {title}
        </h4>
        <p className="text-sm text-primary font-extralight font-sourceSansPro">
          {description}
        </p>
      </div>
    </div>
  );
};

const ActionReelList: React.FC<{ actionReels: IActionReel[] }> = ({
  actionReels,
}: {
  actionReels: IActionReel[];
}) => {
  return (
    <>
      {actionReels[0]?.title ? (
        <div className="md:h-[480px] flex flex-col items-start md:items-center w-full md:w-1/2 max-w-[560px] my-8 md:my-0">
          <div className=" flex flex-col md:overflow-auto items-center">
            <h3 className="w-full text-primary text-md font-semibold font-sourceSansPro mb-2">
              Top Action Reels
            </h3>
            {actionReels.map((actionReel: IActionReel, index: number) => (
              <ActionReel key={index} {...actionReel} />
            ))}
          </div>
        </div>
      ) : (
        <div className="border-l-0 md:border-l min-w-[343px] md:min-w-[340px] lg:min-w-[420px] mt-6 md:mt-0 md:pl-4 border-gray-600">
          <Skeleton className="min-h-[480px] md:min-h-[450px] lg:min-h-[455px]" />
        </div>
      )}
    </>
  );
};

export { ActionReel, ActionReelList };
