import React from 'react';

interface ProfileProps {
  age: number;
  club: string;
  league: string;
  teamName: string;
  ageGroup: string;
  gender: string;
  coach: string;
}

const Profile: React.FC<ProfileProps> = ({
  age,
  club,
  league,
  teamName,
  ageGroup,
  gender,
  coach,
}: ProfileProps) => {
  return (
<div className="w-[400px] lg:mx-auto h-[500px] bg-cyan-950 rounded-10 p-4 mb-4">
    <h2 className='text-white text-[24px] mb-2'>Profile</h2>
  <table className="text-white w-full divide-y divide-gray-200">
  <tbody className="font-extralight text-base">
          <tr className='border-b border-b-slate-600 '>
        <td className="text-left py-1.5">Age</td>
        <td className="text-right">{age}</td>
      </tr>
      <tr  className='border-b border-b-slate-600 py-4'>
        <td className="text-left py-1.5">Club</td>
        <td  className="text-right">{club}</td>
      </tr>
      <tr  className='border-b border-b-slate-600 py-4'>
        <td className="text-left py-1.5">League</td>
        <td className="text-right ">{league}</td>
      </tr>
      <tr  className='border-b border-b-slate-600'>
        <td className="text-left py-1.5">Team name</td>
        <td className="text-right">{teamName}</td>
      </tr>
      <tr  className='border-b border-b-slate-600'>
        <td className="text-left py-1.5">Age group</td>
        <td className="text-right">{ageGroup}</td>
      </tr>
      <tr  className='border-b border-b-slate-600'>
        <td className="text-left py-1.5">Gender</td>
        <td className="text-right">{gender}</td>
      </tr>
      <tr >
        <td className="text-left py-1.5">Coach</td>
        <td className="text-right">{coach}</td>
      </tr>
    </tbody>
  </table>
  <h3 className='text-white text-md pt-4 py-1.5'>Bio</h3>
  <p className='text-white font-extralight text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
Volutpat est velit egestas dui id ornare arcu.</p>
</div>

  );
};

export default Profile;
