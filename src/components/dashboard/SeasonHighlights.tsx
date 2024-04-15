import { ISeasonHighlights } from '@/types/Dashboard.type';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SeasonHighlights: React.FC<ISeasonHighlights> = ({
  seasonHighlights,
}: ISeasonHighlights) => {
  return (
    <>
      {seasonHighlights && seasonHighlights[0] !== '' ? (
        <div
          className="flex flex-col w-full md:w-1/2 ml-2 mr-4 md:mr-6 mb-4 py-8 md:py-0 border-spacing-6
    md:my-0 items-center md:items-start md:max-h-[460px] max-w-[560px] md:max-w-[540px]"
        >
          <h2 className="leading-7 w-full text-[24px] md:text-lg text-primary font-[600] mb-2 text-top">
            Season Highlights
          </h2>
          <div className="max-h-[500px] sm:max-h-[500px] md:max-h-none overflow-visible md:overflow-auto">
            {seasonHighlights.map((highlight, index) => (
              <React.Fragment key={index}>
                <div className="h-px bg-partnersBorders w-full my-4 " />

                <p className="text-[16px] text-primary font-extralight max-w-[560px] md:max-w-[540px] md:pr-2">
                  {highlight}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : seasonHighlights === null ? (
        <div className="w-full mt-[20px] md:mt-0 md:mr-[16px]">
          <h2 className="leading-7 w-full text-[24px] md:text-lg text-primary font-[600] mb-2 text-top">
            Season Highlights
          </h2>
          <div className=" w-full flex h-full text-gray-500 max-w-96 my-4 ma">
            We are working on getting more data. Come back soon to view season
            highlights!
          </div>
        </div>
      ) : (
        <div className="mt-[20px] md:mt-0 md:mr-[16px]">
          <Skeleton className="min-w-[343px] md:min-w-[340px] lg:min-w-[420px] min-h-[496px] md:min-h-[450px] lg:min-h-[455px]" />
        </div>
      )}
    </>
  );
};

export default SeasonHighlights;
