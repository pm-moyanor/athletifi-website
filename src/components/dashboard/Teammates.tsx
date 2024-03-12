import React from 'react';
import Image from 'next/image';
import { ITeammate } from '@/types/Dashboard.type';
import Skeleton from 'react-loading-skeleton';

const Teammates: React.FC<{ teammates: ITeammate[] }> = ({
  teammates,
}: {
  teammates: ITeammate[];
}) => {
  return (
    <>
      {teammates[0]?.id ? (
        <div className="bg-cardsBackground p-4 w-full lg:w-[330px] rounded-10 my-12 lg:my-0 ml-0 lg:ml-6 shadow-md ">
          <h2 className="text-primary font-semibold text-[20px] font-sourceSansPro">
            Teammates
          </h2>
          <div className="h-1 bg-partnersBorders my-2" />
          <div className=" grid grid-col-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-px ">
            {teammates.map((teammate) => (
              <div
                key={teammate.id}
                className="flex items-center py-2 flex-row md:flex-col lg:flex-row"
              >
                {teammate.avatar && teammate.name ? (
                  <Image
                    src={teammate.avatar}
                    alt={teammate.name}
                    width={70}
                    height={70}
                    className="rounded-full bg-slate-500 md:mb-2"
                  />
                ) : (
                  <></>
                )}
                <div className="ml-6 md:ml-0 lg:ml-4 flex flex-col items-start md:items-center lg:items-start">
                  <p className="text-base text-primary font-sourceSansPro">
                    {teammate.name}
                  </p>
                  <p className="text-center inline-block max-w-full text-sm text-offwhite font-sourceSansPro">
                    #{teammate.playerNumber}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Skeleton className="min-w-[343px] md:min-w-[778px] lg:min-w-[330px]  min-h-[426px] md:min-h-[217px] lg:min-h-[458px] mb-12 lg:mb-0" />
      )}
    </>
  );
};

export default Teammates;
