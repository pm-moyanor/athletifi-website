'use client';

import { useState } from 'react';

import { Source_Sans_3 } from 'next/font/google';
import { useUserData } from '@/states/userStore';
import OwnedCard from './SettingsOwnedCard';
import GuestCard from './SettingsGuestCard';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const card_url = '/assets/img/png/anderson-card-img.png';

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
interface Invite extends Referral {
  cardId: string;
  inviter: Guest;
}

const dummyDataReferrals: Referral[] = [
  {
    card: {
      name: 'Salvador Carillo',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: card_url,
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
      card_url: card_url,
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

const dummyDataInvites: Invite[] = [
  {
    cardId: '',
    card: {
      name: 'Daniel Guilmore',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: card_url,
    },
    guests: [],
    inviter: {
      name: 'Daniel Guilmore',
      email: 'daniel@example.com',
    },
  },
  {
    cardId: '',
    card: {
      name: 'Luis Sanchez',
      number: '#22',
      club: 'villanova soccer',
      team: 'team 2009',
      card_url: card_url,
    },
    guests: [],
    inviter: {
      name: 'Lily Sanchez',
      email: 'lily@example.com',
    },
  },
];

export default function ManageReferrals() {
  const [referrals, setReferrals] = useState(dummyDataReferrals);
  const [invites, setInvites] = useState(dummyDataInvites);
  const [isToggle, setIsToggle] = useState(Array(referrals.length).fill(false));

  const [invitation, setInvitation] = useState({
    name: '',
    email: '',
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };

  const emailSubmit = (e) => e.preventDefault();

  const toggleEmailInput = (idx) => {
    setIsToggle((prev) =>
      prev.map((state, index) => (index === idx ? !state : state)),
    );
    if (emailSubmitted) {
      setEmailSubmitted(false);
      setInvitation({ name: '', email: '' });
    }
  };

  const handleRemoveReferral = (referralIdx, guestIdx) => {
    setReferrals((prevReferrals) => {
      const updatedReferrals = [...prevReferrals];
      updatedReferrals[referralIdx].guests.splice(guestIdx, 1);
      return updatedReferrals;
    });
  };

  const handleRemoveInvites = (i) => {
    setInvites(invites.filter((_, idx) => idx !== i));
  };

  const { userData } = useUserData();
  const ownerCards = userData.data?.owned_cards || [];
  const guestCards = userData.data?.guest_cards || [];

  return (
    <div
      className={`${sourceSans3.className} flex flex-col mt-16 text-primary" id="manage-referrals`}
    >
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Manage Referrals
      </h2>

      <div className="text-primary my-8 ">
        {/*=============== REFERRALS */}

        <div className="text-md font-semibold leading-5 mx-2">
          My shared cards
        </div>
        <div className="tfont-extralight mx-2 py-2 mb-2">
          Manage access to your guest list
        </div>

        {referrals.map((referral, idx) => (
          <>
            <OwnedCard
              key={idx}
              card={referral.card}
              guests={referral.guests}
              idx={idx}
              isToggle={isToggle}
              toggleEmailInput={toggleEmailInput}
              emailSubmitted={emailSubmitted}
              invitation={invitation}
              handleChange={handleChange}
              emailSubmit={emailSubmit}
              handleRemoveGuest={(guestIdx) =>
                handleRemoveReferral(idx, guestIdx)
              }
            />
          </>
        ))}
        {/*=============== INVITATIONS */}
        <div className="text-md font-semibold leading-5 mx-2 mt-8">
          My Invitations
        </div>
        <div className="text-primary font-extralight mx-2 py-2 mb-2">
          View invitations to other users&apos; cards
        </div>
        {invites.map((invite, idx) => (
          <GuestCard
            key={idx}
            invite={invite}
            idx={idx}
            handleRemoveInvites={handleRemoveInvites}
          />
        ))}
      </div>
    </div>
  );
}
