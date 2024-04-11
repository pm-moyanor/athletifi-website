'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const dummyDataReferrals = [
  {
    name: 'Gloria Carrillo',
  },
  {
    name: 'Andrew Carrillo',
  },
];

const dummyDataInvites = [
  {
    name: 'Gloria Guilmore',
  },
  {
    name: 'Andrew Guilmore',
  },
];

export default function ManageReferrals() {
  const [referrals, setReferrals] = useState(dummyDataReferrals);
  const [invites, setInvites] = useState(dummyDataInvites);

  function handleRemoveReferral(i: number) {
    setReferrals(referrals.filter((item, idx) => idx !== i));
  }

  function handleRemoveInvites(i: number) {
    setInvites(invites.filter((item, idx) => idx !== i));
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="manage-referrals">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Manage Referrals
      </h2>
      <div className="text-offwhite mx-4 my-8">
        Manage access to your guest list and view invitations to other
        users&apos; cards
      </div>
      <div className="rounded bg-cardsDark pt-4 pb-16 shadow-portalNav">
        <div className="p-4">Guests invited to view your cards</div>
        {referrals.map((referral, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 mx-4 border-b border-b-offwhite"
          >
            <div>{referral.name}</div>
            <div>email</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleRemoveReferral(idx)}
            >
              <div className="mx-4">remove</div>
              <FontAwesomeIcon
                className="text-chartRed text-md md:text-3xl"
                icon={faXmark}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center py-2 mx-4 border-b border-b-offwhite">
          <input
            type="text"
            name="new-referral"
            placeholder="New guest"
            className="text-offwhite border-0 bg-inherit py-3"
          />
          <button className="flex items-center cursor-pointer" type="submit">
            <div className="mx-4">add</div>
            <FontAwesomeIcon
              className="text-skyblue text-md md:text-3xl"
              icon={faPlus}
            />
          </button>
        </div>
        <div className="p-4 mt-4">Cards you have been invited to see</div>
        {invites.map((invite, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-4 mx-4 border-b border-b-offwhite"
          >
            <div>{invite.name}</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleRemoveInvites(idx)}
            >
              <div className="mx-4">remove</div>
              <FontAwesomeIcon
                className="text-chartRed text-md md:text-3xl"
                icon={faXmark}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
