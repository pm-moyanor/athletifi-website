import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { IProfileProps } from '@/types/Dashboard.type';

const Profile: React.FC<IProfileProps> = ({
  age,
  club,
  league,
  team,
  age_group,
  gender,
  coach,
  bio,
}: IProfileProps) => {
  return (
    <>
      {age ? (
        <div className="w-full h-[560px] bg-cardsBackground rounded-10 p-4 mb-4 mt-4 -mt-0 lg:mb-0 lg:-mt-[100px] flex flex-col">
          <h2 className="text-primary text-[24px] mb-4 font-semibold">
            Profile
          </h2>
          <table className="text-primary w-full divide-y divide-gray-200">
            <tbody className="font-light text-base">
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">Age</td>
                <td className="text-right min-w-24 px-[4px]">{age}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">Club</td>
                <td className="text-right px-[4px]">{club}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">League</td>
                <td className="text-right px-[4px]">{league}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">Team name</td>
                <td className="text-right px-[4px]">{team}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">Age group</td>
                <td className="text-right px-[4px]">{age_group}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-2 px-[4px]">Gender</td>
                <td className="text-right px-[4px]">{gender}</td>
              </tr>
              <tr>
                <td className="text-left py-2 px-[4px]">Coach</td>
                <td className="text-right px-[4px]">{coach}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-primary text-[20px] mt-6 mb-2 w-full">Bio</h3>
          <div className="h-full overflow-y-auto mb-4 ">
            <p className="text-primary font-light text-base ">{bio}</p>
          </div>
        </div>
      ) : (
        <div className="lg:-mt-[86px]">
          <Skeleton
            className="min-w-[351px] md:min-w-[626px] lg:min-w-[387px] min-h-[584px] mb-3"
            borderRadius={10}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
