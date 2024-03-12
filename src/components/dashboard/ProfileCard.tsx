import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { IProfileProps } from '@/types/Dashboard.type';

const Profile: React.FC<IProfileProps> = ({
  age,
  club,
  league,
  team,
  ageGroup,
  gender,
  coach,
  bio,
}: IProfileProps) => {
  return (
    <>
      {age ? (
        <div className="w-full h-[586px] bg-cardsBackground rounded-10 p-4 mb-4 lg:-mt-[86px] font-sourceSansPro overflow-scroll">
          <h2 className="text-primary text-[24px] mb-4 font-semibold">
            Profile
          </h2>
          <table className="text-primary w-full divide-y divide-gray-200">
            <tbody className="font-extralight text-base">
              <tr className="border-b border-partnersBorders ">
                <td className="text-left py-1.5">Age</td>
                <td className="text-right min-w-24">{age}</td>
              </tr>
              <tr className="border-b border-partnersBorders py-4">
                <td className="text-left py-1.5">Club</td>
                <td className="text-right">{club}</td>
              </tr>
              <tr className="border-b border-partnersBorders py-4">
                <td className="text-left py-1.5">League</td>
                <td className="text-right ">{league}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-1.5">Team name</td>
                <td className="text-right">{team}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-1.5">Age group</td>
                <td className="text-right">{ageGroup}</td>
              </tr>
              <tr className="border-b border-partnersBorders">
                <td className="text-left py-1.5">Gender</td>
                <td className="text-right">{gender}</td>
              </tr>
              <tr>
                <td className="text-left py-1.5">Coach</td>
                <td className="text-right">{coach}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-primary text-md mt-6 mb-px">Bio</h3>
          <p className="text-primary font-extralight text-sm min-w-[319px] md:min-w-[594px] lg:min-w-[354px]">
            {bio}
          </p>
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
