'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const dummyDataReferrals = [
  {
    name: 'Gloria Carrillo',
  },
  {
    name: 'Gloria Carrillo',
  },
];

const dummyDataInvites = [
  {
    name: 'Andrew Guilmore',
  },
  {
    name: 'Andrew Guilmore',
  },
];

export default function ManageReferrals() {
  const [referrals, setReferrals] = useState(dummyDataReferrals);
  const [invites, setInvites] = useState(dummyDataInvites);

  return (
    <div className="flex flex-col mt-16 text-white">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4">
        Manage Referrals
      </h2>
      <div className="text-offwhite mx-4 my-8">
        Manage access to your guest list and view invitations to other
        users&apos; cards
      </div>
      <div className="rounded bg-cardsDark pt-4 pb-16">
        <div className="p-4">Guests invited to view your cards</div>
        {referrals.map((referral, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 mx-4 border-b border-b-offwhite"
          >
            <div>{referral.name}</div>
            <div className="flex items-center cursor-pointer">
              <div className="mx-4">remove</div>
              <FontAwesomeIcon
                className="text-chartRed text-basemd md:text-3xl"
                icon={faXmark}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center py-4 mx-4 border-b border-b-offwhite">
          <div className="text-offwhite">New guest</div>
          <div className="flex items-center cursor-pointer">
            <div className="mx-4">add</div>
            <FontAwesomeIcon
              className="text-skyblue text-basemd md:text-3xl"
              icon={faPlus}
            />
          </div>
        </div>
        <div className="p-4 mt-4">Cards you have been invited to see</div>
        {invites.map((invite, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 mx-4 border-b border-b-offwhite"
          >
            <div>{invite.name}</div>
            <div className="flex items-center cursor-pointer">
              <div className="mx-4">remove</div>
              <FontAwesomeIcon
                className="text-chartRed text-basemd md:text-3xl"
                icon={faXmark}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
