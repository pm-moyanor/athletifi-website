'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

import { Source_Sans_3 } from 'next/font/google';
import Card from './../../../public/assets/img/png/anderson-card-img.png';
const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

// might be worth to split this component in 2 (for guests and intitations), it's a bit long
// the UI is updated and a dropdown to enter the info to invite to access the card. the rest of the logic is on hold till we change state handling strategy

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
  const [referrals, setReferrals] = useState<Referral[]>(dummyDataReferrals);
  const [invites, setInvites] = useState<Invite[]>(dummyDataInvites);
  const [isToggle, setIsToggle] = useState(Array(referrals.length).fill(false));

  const [invitation, setInvitation] = useState<{ name: string; email: string }>(
    {
      name: '',
      email: '',
    },
  );
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };
  //===============on hold till we decide on state manager
  const emailSubmit = (e: FormEvent) => e.preventDefault();

  const toggleEmailInput = (idx: number) => {
    setIsToggle((prev) =>
      prev.map((state, index) => (index === idx ? !state : state)),
    );
    if (emailSubmitted) {
      setEmailSubmitted(false);
      setInvitation({ name: '', email: '' });
    }
  };

  function handleRemoveReferral(referralIdx: number, guestIdx: number) {
    setReferrals((prevReferrals) => {
      const updatedReferrals = [...prevReferrals];
      updatedReferrals[referralIdx].guests.splice(guestIdx, 1);
      return updatedReferrals;
    });
  }

  function handleRemoveInvites(i: number) {
    setInvites(invites.filter((_, idx) => idx !== i));
  }

  //====================================
  function useOutsideClick(
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
  ): void {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  }

  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => setIsToggle(false));
  //=======================================

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
          <div
            ref={cardRef}
            key={idx}
            className="rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-4"
          >
            <div className="flex justify-start items-start min-w-[250px]">
              <div className="relative w-24 h-28 justify-end">
                <Image
                  src={referral.card.card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex mt-2 flex-col flex-shrink">
                <h2
                  className={`mx-[6px] mb-[6px] font-bold text-md text-primary`}
                >
                  {referral.card.name}
                </h2>
                <div className="mx-[6px] flex flex-col text-sm flex-1">
                  <p
                    className={`pb-1  leading-4 text-primary opacity-80 relative `}
                  >
                    {referral.card.club}
                  </p>
                  <p
                    className={`pb-1 leading-4 text-primary opacity-80  relative`}
                  >
                    {referral.card.team}
                  </p>
                  <p
                    className={`leading-4 text-primary opacity-80 lg:max-w-769 relative `}
                  >
                    {referral.card.number}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-1 bg-partnersBorders w-full opacity-20"></div>
            <div className=" w-full px-[4px] lg:ml-8  md:max-w-[500px]">
              <p className="font-extralight mt-2">
                Manage guests for this card
              </p>
              {referral.guests.map((guest, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-partnersBorders border-opacity-20 text-sm
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
                    onClick={() => handleRemoveReferral(idx, index)}
                  >
                    <div className="mx-[6px] md:mx-4">remove</div>
                    <FontAwesomeIcon
                      className="text-chartRed text-md md:text-2xl"
                      icon={faXmark}
                    />
                  </div>
                </div>
              ))}

              <div
                className="w-full flex justify-between items-center"
                onClick={() => toggleEmailInput(idx)}
              >
                {!isToggle[idx] && (
                  <>
                    <p> New guest</p>

                    <button
                      className="flex items-center cursor-pointer "
                      type="submit"
                    >
                      <div className="flex justify-between items-center py-4 text-sm mx-[6px] md:mx-4">
                        invite
                      </div>
                      <FontAwesomeIcon
                        className=" text-skyblue text-md md:text-2xl"
                        icon={faPlus}
                      />
                    </button>
                  </>
                )}
              </div>

              {/*======== toggle input to send referral====== */}
              <AnimatePresence>
                {isToggle[idx] && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { height: 'auto' },
                      collapsed: { height: 0 },
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="w-full"
                  >
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 100 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.08,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="py-6"
                    >
                      <p className=" text-sm mb-6 text-start text-primary lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                        {emailSubmitted
                          ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                          : 'Invite someone to view this player card by providing their information below.'}
                      </p>
                      {!emailSubmitted && (
                        <form
                          className="w-full flex flex-col gap-3 items-end"
                          onSubmit={emailSubmit}
                        >
                          {invitation.name !== undefined &&
                            invitation.email !== undefined && (
                              <>
                                <input
                                  type="text"
                                  name="name"
                                  value={invitation.name}
                                  placeholder="Type guest name here"
                                  className=" bg-offwhite bg-opacity-10 h-8 text-sm bottom-0 left-0 w-full p-3 border border-partnersBorders rounded text-partnersBorders"
                                  onChange={handleChange}
                                />
                                <input
                                  type="email"
                                  name="email"
                                  value={invitation.email}
                                  placeholder="Type email here"
                                  className=" bg-offwhite bg-opacity-10 h-8 text-sm bottom-0 left-0 w-full p-3 border rounded border-partnersBorders text-partnersBorders"
                                  onChange={handleChange}
                                />
                              </>
                            )}
                          <button
                            type="submit"
                            className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-darkerSkyBlue rounded"
                          >
                            Send invitation
                          </button>
                        </form>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
        {/*=============== INVITATIONS */}
        <div className="text-md font-semibold leading-5 mx-2 mt-8">
          My Invitations
        </div>
        <div className="text-primary font-extralight mx-2 py-2 mb-2">
          View invitations to other users&apos; cards
        </div>
        {dummyDataInvites.map((invite, idx) => (
          <div
            key={idx}
            className="
            rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-2 md:gap-4"
          >
            <div className="flex justify-start items-start min-w-[250px]">
              <div className="relative w-24 h-28 justify-end">
                <Image
                  src={invite.card.card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="flex mt-2 flex-col flex-shrink">
                <h2
                  className={`mx-[6px] mb-[6px] font-bold text-md text-primary`}
                >
                  {invite.card.name}
                </h2>
                <div className="mx-[6px] flex flex-col text-sm flex-1">
                  <p
                    className={`pb-1  leading-4 text-primary opacity-80 relative `}
                  >
                    {invite.card.club}
                  </p>
                  <p
                    className={`pb-1 leading-4 text-primary opacity-80  relative`}
                  >
                    {invite.card.team}
                  </p>
                  <p
                    className={`leading-4 text-primary opacity-80 lg:max-w-769 relative `}
                  >
                    {invite.card.number}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-1 bg-partnersBorders w-full opacity-20 md:w-0"></div>
            <div className="flex flex-col justify-between w-full mt-2 md:max-w-[500px] px-[4px] lg:ml-8 ">
              <div className=" items-start mt-0 w-full">
                <p className=" font-extralight text-base ">Card owner</p>
                <div className="flex justify-between items-start">
                  <div className="text-sm flex flex-col">
                    <p className="mb-[2px] pt-2">{invite.inviterName}</p>
                    <p className="md:text-center font-extralight">
                      {invite.inviterEmail}
                    </p>
                  </div>
                  <div
                    className="flex items-center justify-end cursor-pointer"
                    onClick={() => handleRemoveInvites(idx)}
                  >
                    <div className="text-sm py-4 mx-2 md:mx-4 text-end">
                      decline
                    </div>
                    <FontAwesomeIcon
                      className="text-chartRed text-md md:text-2xl"
                      icon={faXmark}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
