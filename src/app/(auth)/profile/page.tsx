'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IProfileProps } from '@/types/Dashboard.type';
import Header from '@/components/user-portal/Header';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';
import { useAtom } from 'jotai';
import { postHelperResponseAtom } from '@/states/userStore';
import AlertModal from '@/components/common/AlertModal';
import { AlertModalType } from '@/types/AlertModalType';

// import { userDataAtom } from '@/states/userStore';
import { useAtomValue } from 'jotai';
import {
  ownedCardsDataAtom,
  guestCardsDataAtom,
} from '@/states/profileCardsDataStore';

//motion variants to animate the team bars
const variants = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Profile = () => {
  const ownedCardsData = useAtomValue(ownedCardsDataAtom);
  const guestCardsData = useAtomValue(guestCardsDataAtom);
  const [inviteData] = useAtom(postHelperResponseAtom);
  const [inviteStatus, setInviteStatus] = useState<AlertModalType | null>();

  //console.log('ownedCardsData', ownedCardsData[0]);
  console.log('guestCardsData in profile', guestCardsData);
  console.log('ownedCardsData in profile', ownedCardsData);

  // This useEffect hook runs whenever the inviteData changes
  useEffect(() => {
    // Get the value of 'hasShownModal' from local storage
    const hasShownModal = localStorage.getItem('hasShownModal');

    // If the modal has not been shown and there is valid invite data
    if (
      !hasShownModal &&
      inviteData &&
      inviteData.invitation.invite_id &&
      // inviteData.invitation.invite_status !== 'ALREADY_ACCEPTED' &&
      inviteData.invitation.invite_status !== 'SUCCESS'
    ) {
      let inviteMessage = null;

      // Set the invite message based on the invite status
      if (inviteData.invitation.invite_status === 'REVOKED') {
        inviteMessage =
          'We understand you were previously granted access to this card. However, the card owner has chosen to revoke your access privileges. We apologize for any inconvenience this may cause.';
      } else if (inviteData.invitation.invite_status === 'EXPIRED') {
        inviteMessage =
          'The access you were granted to this card has now expired. The card owner may choose to reinstate your access if they wish. Thank you for your understanding.';
      } else if (
        inviteData.invitation.invite_status === 'UNEXPECTED_STATUS' &&
        inviteData.invitation.invite_status === 'NOT_FOUND'
      ) {
        inviteMessage =
          "Oops! We encountered an issue processing your invitation. It's possible the invitation doesn't exist or there was a problem on our end. Please double-check the invitation details or contact the card owner for assistance.";
      } else if (inviteData.invitation.invite_status === 'ALREADY_ACCEPTED') {
        inviteMessage =
          'This invitation has already been redeemed. If you believe this is an error, please contact our support team for assistance.';
      }

      // Set the invite status state with the title and message
      setInviteStatus({
        title: 'Card Access Unavailable',
        textBody: inviteMessage,
      });

      // Store a flag in local storage to indicate that the modal has been shown
      localStorage.setItem('hasShownModal', 'true');
    }
  }, [inviteData]); // This hook depends on the inviteData

  // Log the invite status for debugging
  // console.log(inviteStatus);

  // Function to close the modal by setting the invite status to null
  const closeModal = () => {
    setInviteStatus(null);
  };
  // const [openIndex, setOpenIndex] = useState<boolean[]>(
  //   Array(populatedTeams.length).fill(false),
  // );

  // ADD SKELETON
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="absolute top-0 left-0 bg-gradient-to-r from-cardsDark2 to-cardsBackground h-[280px] lg:h-[330px] w-full -z-10"></div>
      <main className="mx-2 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
        <Header pageTitle={'Cards'} />
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center mt-4 md:pt-7"
        >
          {inviteStatus && (
            <AlertModal
              title={inviteStatus.title}
              textBody={inviteStatus.textBody}
              onClose={closeModal}
            />
          )}
          <motion.div
            variants={variants}
            className="overflow-hidden w-full max-w-[1030px] mb-4 text-primary bg-cardsDark shadow-lg rounded-10 flex flex-col px-2 md:px-4 py-8"
          >
            <h2 className="font-semibold text-md text-primary p-2 pt-0">
              My cards
            </h2>

            <div className="flex flex-col">
              <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
              {ownedCardsData.length > 0 ? (
                <div className="flex flex-wrap w-full gap-4">
                  {ownedCardsData.map((cardData, idx) => (
                    <RenderCardThumbnail
                      key={idx}
                      // userData={cardData}
                      cardData={cardData}
                      isOwned={true}
                      inSettings={false}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-primary opacity-80 p-2">
                  You have no cards.
                </p>
              )}
            </div>
            <div className="pt-6">
              <h2 className="font-semibold text-md text-primary p-2 pt-0">
                Shared with me
              </h2>
              <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
              {guestCardsData.length > 0 ? (
                <div className="flex justify-start py-2 overflow-x-auto hide-scrollbar gap-4">
                  {guestCardsData.map((cardData, idx) => (
                    <RenderCardThumbnail
                      key={idx}
                      cardData={cardData}
                      isOwned={false}
                      inSettings={false}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-primary opacity-80 p-2">
                  No cards shared with you.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Profile;
