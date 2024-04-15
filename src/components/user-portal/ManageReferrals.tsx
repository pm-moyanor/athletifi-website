'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Source_Sans_3 } from 'next/font/google';
import Card from './../../../public/assets/img/png/anderson-card-img.png';
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

interface Guest {
  name: string;
  email: string;
}

interface Referral {
  card: {
    name: string;
    number: string;
    club: string;
    team: string;
    card_url: string;
  };
  guests: Guest[];
}
interface Invite {
  cardId: string;
  inviter: Guest;
}

const dummyDataReferrals = [
  {
    card: {
      name: 'Salvador Carillo',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: Card,
    },
    guests: [
      {
        name: 'Gloria Carrillo',
        email: 'gloria@example.com',
      },
      {
        name: 'Andrew Carrillo',
        email: 'andrew@example.com',
      },
    ],
  },
  {
    card: {
      name: 'Salvador Carillo',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: Card,
    },
    guests: [
      {
        name: 'Gloria Carrillo',
        email: 'gloria@example.com',
      },
      {
        name: 'Andrew Carrillo',
        email: 'andrew-carrillo@example.com',
      },
    ],
  },
];

const dummyDataInvites = [
  {
    card: {
      name: 'Daniel Guilmore',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: Card,
    },
    inviterName: 'Daniel Guilmore',
    inviterEmail: 'daniel@example.com',
  },
  {
    card: {
      name: 'Luis Sanchez',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: Card,
    },
    inviterName: 'Lily Sanchez',
    inviterEmail: 'lily@example.com',
  },
];

export default function ManageReferrals() {
  const [referrals, setReferrals] = useState<Referral>(dummyDataReferrals);
  const [invites, setInvites] = useState<Invite[]>(dummyDataInvites);

  function handleRemoveReferral(i: number) {
    setReferrals(referrals.filter((_, idx) => idx !== i));
  }

  function handleRemoveInvites(i: number) {
    setInvites(invites.filter((_, idx) => idx !== i));
  }

  return (
    <div
      className={`${sourceSans3.className} flex flex-col mt-10 text-primary" id="manage-referrals`}
    >
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 shadow-portalNav">
        Manage Referrals
      </h2>

      <div className="text-primary pt-4 pb-16 ">
        <div className="text-[24px] font-semibold mt-12">My shared cards</div>
        <div className="text-primary my-4">
          Manage access to your guest list
        </div>

        {referrals.map((referral, idx) => (
          <div
            key={idx}
            className="rounded bg-cardsDark p-2 md:py-10 mb-4 shadow-portalNav flex flex-row justify-between items-start flex-wrap"
          >
            <div className="flex justify-start items-center py-6 md:py-0">
              <div className="relative w-28 h-28 justify-end">
                <Image
                  src={referral.card.card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex mt-2 flex-col max-w-2/3">
                <h2
                  className={`mx-[6px] mb-[6px] font-bold text-md text-primary`}
                >
                  {referral.card.name}
                </h2>
                <div className="mx-[6px] flex flex-col text-sm flex-1">
                  <p
                    className={`  leading-5 text-primary opacity-80 relative `}
                  >
                    {referral.card.club}
                  </p>
                  <p className={`leading-5 text-primary opacity-80  relative`}>
                    {referral.card.team}
                  </p>
                  <p
                    className={`leading-5 text-primary opacity-80 lg:max-w-769 relative `}
                  >
                    {referral.card.number}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 w-full md:w-7/12">
              <p className="font-extralight">Manage guests for this card</p>
              {referral.guests.map((guest, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-partnersBorders border-opacity-50 text-sm max-w-[450px]
                  "
                >
                  <div className="flex flex-col">
                    <p>{guest.name}</p>
                    <p className="md:text-center font-extralight flex-1">
                      {guest.email}
                    </p>
                  </div>

                  <div
                    className="flex items-center cursor-pointer justify-end"
                    onClick={() => handleRemoveReferral(idx)}
                  >
                    <div className="mx-[6px] md:mx-4">remove</div>
                    <FontAwesomeIcon
                      className="text-chartRed text-md md:text-2xl"
                      icon={faXmark}
                    />
                  </div>
                </div>
              ))}
              <div className=" flex justify-between items-center py-2">
                <input
                  type="text"
                  name="new-referral"
                  placeholder="New guest"
                  className="text-sm text-offwhite border-0 bg-inherit py-3"
                />
                <button
                  className="flex items-center cursor-pointer"
                  type="submit"
                >
                  <div className="text-sm mx-[6px] md:mx-4">add</div>
                  <FontAwesomeIcon
                    className="text-skyblue text-md md:text-2xl"
                    icon={faPlus}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="text-[24px] font-semibold mt-12">My Invitations</div>
        <div className="text-primary my-4">
          View invitations to other users&apos; cards
        </div>
        {dummyDataInvites.map((invite, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row justify-between rounded bg-cardsDark p-2 py-10 mb-4 shadow-portalNav"
          >
            <div className="flex justify-start items-center py-6 md:py-0">
              <div className="relative w-28 h-28 justify-end">
                <Image
                  src={invite.card.card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className={`mx-2 mb-2 font-bold text-md text-primary`}>
                  {invite.card.name}
                </h2>
                <div className="mx-2  flex flex-col mb-2 text-sm flex-1">
                  <p
                    className={`  leading-5 text-primary opacity-80 relative `}
                  >
                    {invite.card.club}
                  </p>
                  <p className={`leading-5 text-primary opacity-80  relative`}>
                    {invite.card.team}
                  </p>
                  <p
                    className={`leading-5 text-primary opacity-80 lg:max-w-769 relative `}
                  >
                    {invite.card.number}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between md:w-7/12 mx-2">
              <div className="text-sm flex flex-col items-start">
                <p className=" font-extralight mb-2">Card owner</p>
                <p className="mb-[2px]">{invite.inviterName}</p>
                <p className="md:text-center font-extralight">
                  {invite.inviterEmail}
                </p>
              </div>

              <div
                className="flex items-center cursor-pointer mt-4 self-end"
                onClick={() => handleRemoveInvites(idx)}
              >
                <div className="mx-4 text-sm">
                  I don&apos;t want access to this card
                </div>
                <FontAwesomeIcon
                  className="text-chartRed text-md md:text-2xl"
                  icon={faXmark}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
