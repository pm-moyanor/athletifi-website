'use client';

import { useState, useEffect } from 'react';
import { Source_Sans_3 } from 'next/font/google';
import { useUserData } from '@/states/userStore';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';

import { useAtomValue } from 'jotai';
import {
  ownedCardsDataAtom,
  guestCardsDataAtom,
} from '@/states/profileCardsDataStore';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const card_url = '/assets/img/png/anderson-card-img.png';



export default function ManageReferrals() {

  const ownedCardsData = useAtomValue(ownedCardsDataAtom);
  const guestCardsData = useAtomValue(guestCardsDataAtom);

  // const { userData } = useUserData();



  return (
    <div
      className={`${sourceSans3.className} flex flex-col mt-16 text-primary`}
      id="manage-referrals"
    >
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Manage Referrals
      </h2>

      <div className="text-primary my-8">
        {/*=============== REFERRALS */}
        <div className="text-md font-semibold leading-5 mx-2">
          My shared cards
        </div>
        <div className="font-extralight mx-2 py-2 mb-2">
          Manage access to your guest list
        </div>
        {ownedCardsData.length > 0 ? (
          ownedCardsData.map((cardData, idx) => (
            <RenderCardThumbnail
              key={idx}
              cardData={cardData}
              isOwned={true}
              inSettings={true}
            />
          ))
        ) : (
          <p className="text-primary opacity-80 p-2">No cards.</p>
        )}
        {/*=============== INVITATIONS */}
        <div className="text-md font-semibold leading-5 mx-2 mt-8">
          My Invitations
        </div>
        <div className="text-primary font-extralight mx-2 py-2 mb-2">
          View invitations to other users&apos; cards
        </div>
        {guestCardsData.length > 0 ? (
          guestCardsData.map((cardData, idx) => (
            <RenderCardThumbnail
              key={idx}
              cardData={cardData}
              isOwned={false}
              inSettings={true}
            />
          ))
        ) : (
          <p className="text-primary opacity-80 p-2">
            No cards shared with you.
          </p>
        )}
      </div>
    </div>
  );
}
