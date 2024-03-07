import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { ProfileProps } from '@/types/Dashboard.type';

const Profile: React.FC<ProfileProps> = ({
  age,
  club,
  league,
  teamName,
  ageGroup,
  gender,
  coach,
  bio,
}: ProfileProps) => {
  return (
    <div className="w-full h-[500px] bg-cardsBackground rounded-10 p-4 mb-4 font-sourceSansPro overflow-scroll">
      <h2 className="text-primary text-[24px] mb-4 font-semibold">Profile</h2>
      <table className="text-primary w-full divide-y divide-gray-200">
        <tbody className="font-extralight text-base">
          <tr className="border-b border-partnersBorders ">
            <td className="text-left py-1.5">Age</td>
            <td className="text-right min-w-24">{age || <Skeleton />}</td>
          </tr>
          <tr className="border-b border-partnersBorders py-4">
            <td className="text-left py-1.5">Club</td>
            <td className="text-right">{club || <Skeleton />}</td>
          </tr>
          <tr className="border-b border-partnersBorders py-4">
            <td className="text-left py-1.5">League</td>
            <td className="text-right ">{league || <Skeleton />}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Team name</td>
            <td className="text-right">{teamName || <Skeleton />}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Age group</td>
            <td className="text-right">{ageGroup || <Skeleton />}</td>
          </tr>
          <tr className="border-b border-partnersBorders">
            <td className="text-left py-1.5">Gender</td>
            <td className="text-right">{gender || <Skeleton />}</td>
          </tr>
          <tr>
            <td className="text-left py-1.5">Coach</td>
            <td className="text-right">{coach || <Skeleton />}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-primary text-md mt-6 mb-px">Bio</h3>
      <p className="text-primary font-extralight text-sm min-w-[318px] md:min-w-[754px] lg:min-w-[318px]">
        {bio || <Skeleton count={4} />}
      </p>
    </div>
  );
};

export default Profile;
