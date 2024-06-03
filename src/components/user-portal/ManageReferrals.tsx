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

// const dummyDataReferrals: Referral[] = [
//   {
//     card: {
//       name: 'Salvador Carillo',
//       number: '#22',
//       club: 'villanova soccer',
//       team: 'team 2009',
//       card_url: card_url,
//     },
//     guests: [
//       {
//         name: 'Gloria Carrillo',
//         email: 'gloria@example.com',
//       },
//       {
//         name: 'Andrew Carrillo',
//         email: 'andrew@example.com',
//       },
//     ],
//   },
//   {
//     card: {
//       name: 'Salvador Carillo',
//       number: '#22',
//       club: 'villanova soccer',
//       team: 'team 2009',
//       card_url: card_url,
//     },
//     guests: [
//       {
//         name: 'Gloria Carrillo',
//         email: 'gloria@example.com',
//       },
//       {
//         name: 'Andrew Carrillo',
//         email: 'andrew-carrillo@example.com',
//       },
//     ],
//   },
// ];

// const dummyDataInvites: Invite[] = [
//   {
//     cardId: '',
//     card: {
//       name: 'Daniel Guilmore',
//       number: '#22',
//       club: 'villanova soccer',
//       team: 'team 2009',
//       card_url: card_url,
//     },
//     guests: [],
//     inviter: {
//       name: 'Daniel Guilmore',
//       email: 'daniel@example.com',
//     },
//   },
//   {
//     cardId: '',
//     card: {
//       name: 'Luis Sanchez',
//       number: '#22',
//       club: 'villanova soccer',
//       team: 'team 2009',
//       card_url: card_url,
//     },
//     guests: [],
//     inviter: {
//       name: 'Lily Sanchez',
//       email: 'lily@example.com',
//     },
//   },
// ];

export default function ManageReferrals() {
  const { userData } = useUserData();
  const [referrals, setReferrals] = useState<OwnedCards[]>([]);
  const [invites, setInvites] = useState<GuestCards[]>([]);
  const ownedCardsData = useAtomValue(ownedCardsDataAtom);
  const guestCardsData = useAtomValue(guestCardsDataAtom);

  useEffect(() => {
    if (userData && userData.data) {
      setReferrals(userData.data.owned_cards || []);
      setInvites(userData.data.guest_cards || []);
    }
  }, [userData]);

  const handleRemoveReferral = (referralIdx: number, guestIdx: number) => {
    setReferrals((prevReferrals) => {
      const updatedReferrals = [...prevReferrals];
      updatedReferrals[referralIdx].guests.splice(guestIdx, 1);
      return updatedReferrals;
    });
  };

  const handleRemoveInvites = (inviteId: string) => {
    setInvites((prevInvites) => {
      const updatedInvites = prevInvites.filter(
        (invite) => invite.invite_id !== inviteId,
      );
      console.log('Invite removed with ID:', inviteId); //update in table?
      return updatedInvites;
    });
  };

  console.log(userData.data);

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
              cardData={cardData.result}
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
              cardData={cardData.result}
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
