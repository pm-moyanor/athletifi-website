'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IProfileProps } from '@/types/Dashboard.type';
import Header from '@/components/user-portal/Header';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';
import Card from '@/../public/assets/img/png/anderson-card-img.png';
import { useAtom } from 'jotai';
import { postHelperResponseAtom } from '@/states/userStore';
import AlertModal from '@/components/common/AlertModal';
import { AlertModalType } from '@/types/AlertModalType';

const profileProps: IProfileProps = {
  name: 'Mariano Jose Alvarez',
  number: '#22',
  club: 'villanova soccer',
  team: 'team 2009',
  card_url: Card,
};

// const populatedTeams = [
//   {
//     teamName: 'Villanova Soccer Academy',
//     cards: [
//       {
//         id: 1,
//       },
//       {
//         id: 2,
//       },
//       {
//         id: 3,
//       },
//     ],
//   },
//   {
//     teamName: 'Team B',
//     cards: [
//       {
//         id: 4,
//       },
//       {
//         id: 5,
//       },
//     ],
//   },
// ];
//adjust when integrate data
// interface Team {
//   teamName: string;
//   cards: { id: number }[];
// }

//dummy component to render cards by team
// const CardsByTeam = ({ team }: { team: Team }) => (
//   <div className="flex justify-center md:flex-row flex-wrap items-center md:items-start">
//     {team.cards.map((card, index) => (
//       <RenderCardThumbnail key={index} />
//     ))}
//   </div>
// );

//motion variants to animate the team bars
const variants = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Profile = () => {
  const [inviteData] = useAtom(postHelperResponseAtom);
  const [inviteStatus, setInviteStatus] = useState<AlertModalType | null>();
  // const [openModal, setOpenModal] = useState<boolean>(false);
  console.log('inviteData object', inviteData);
  useEffect(() => {
    const hasShownModal = localStorage.getItem('hasShownModal');
    if (!hasShownModal && inviteData && inviteData.invitation.invite_id) {
      // TODO: create the appropriate message for users to see base on the keyword from the invite_status
      setInviteStatus({
        title: 'Card Access Unavailable',
        textBody: inviteData.invitation.invite_status,
      });
      // store invite id values in local storage to manage the hasShownModal boolean, in case the users sees the modal again after login. use an array.
      localStorage.setItem('hasShownModal', 'true');
      //wipe the local store after user logouts
    }
  }, [inviteData]);

  console.log(inviteStatus);

  const closeModal = () => {
    setInviteStatus(null);
  };

  // const [openIndex, setOpenIndex] = useState<boolean[]>(
  //   Array(populatedTeams.length).fill(false),
  // );
  const [isToggle, setIsToggle] = useState<boolean>(false);
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
  const emailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (invitation.email) {
      console.log(invitation);
      setEmailSubmitted(true);
    } else {
      console.log('invalid email');
    }
  };

  const toggleEmailInput = () => {
    setIsToggle(!isToggle);
    if (emailSubmitted) {
      setEmailSubmitted(false);
      setInvitation({ name: '', email: '' });
    }
  };

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
          <motion.div
            variants={variants}
            className="overflow-hidden w-full max-w-[1030px] mb-4 text-primary bg-cardsDark shadow-lg rounded-10  flex flex-col px-4 py-8"
          >
            {inviteStatus && (
              <AlertModal
                title={inviteStatus.title}
                textBody={inviteStatus.textBody}
                onClose={closeModal}
              />
            )}
            <h2 className=" font-semibold text-primary">My cards</h2>
            <div className="flex flex-col">
              <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
              <div className="flex justify-between flex-col md:flex-row items-center">
                <div className="relative w-[300px] h-[350px] md:w-[160px] md:h-[210px]">
                  <Image
                    src={Card}
                    alt="Card Thumbnail"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-[12px] items-center flex-1 lg:justify-evenly">
                  <h2 className="leading-8 font-bold text-[28px] md:text-[24px] text-primary text-center">
                    {profileProps.name}
                  </h2>

                  <div className="flex gap-4 ">
                    <div className="w-16 h-18 relative">
                      <Image
                        src="/vecteezy_crest_1204211.png"
                        alt="club crest"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div className="gap-1 flex flex-col text-sm">
                      <p className={` text-primary opacity-80 relative `}>
                        {profileProps.club}
                      </p>
                      <p className={` text-primary opacity-80  relative`}>
                        {profileProps.team}
                      </p>
                      <p
                        className={` text-primary opacity-80 lg:max-w-769 relative `}
                      >
                        {profileProps.number}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col my-12 md:mx-4 gap-2 items-center justify-center">
                  <button className="text-darkgray w-[130px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out">
                    go to dashboard
                  </button>
                  <button
                    className=" text-primary w-[130px] md:w-[160px] h-8 text-xs md:text-sm border border-offwhite  rounded-full font-extralight bg-transparent hover:bg-skyblue hover:border-skyblue transform hover:scale-95 ease-in-out"
                    onClick={toggleEmailInput}
                  >
                    share access to card
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {isToggle && (
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
                    className="px-3 w-full self-center md:self-end max-w-[500px] md:max-w-none"
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
                      className="mt-2 mb-8 flex flex-col lg:flex-row justify-end lg:items-center lg:gap-3"
                    >
                      <p className=" text-sm mb-2 lg:mb-0 text-offwhite relative min-w-[216px] transition-opacity duration-300 opacity-100 mr-4">
                        {emailSubmitted
                          ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                          : 'Invite someone to view this card'}
                      </p>
                      {!emailSubmitted && (
                        <form
                          className="w-full flex flex-col md:flex-row gap-3 justify-end"
                          onSubmit={emailSubmit}
                        >
                          <input
                            type="text"
                            name="name"
                            value={invitation.name}
                            placeholder="Type guest name here"
                            className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[360px] p-3 border border-partnersBorders rounded text-partnersBorders bg-cardsBackground"
                            onChange={handleChange}
                          />
                          <input
                            type="email"
                            name="email"
                            value={invitation.email}
                            placeholder="Type email here"
                            className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[360px] p-3 border border-partnersBorders rounded text-partnersBorders bg-cardsBackground "
                            onChange={handleChange}
                          />
                          <button
                            type="submit"
                            className="text-darkgray w-[130px] md:min-w-[160px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full hover:opacity-90 transform hover:scale-95 ease-in-out mt-2 md:mt-0"
                          >
                            Send invitation
                            {/* <FontAwesomeIcon icon={faArrowRight} /> */}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="py-4">
              <h2 className="font-semibold text-primary">Shared with me</h2>
              <div className="h-1 w-full bg-partnersBorders opacity-50 my-2"></div>
              <div className="flex justify-start py-4 overflow-x-auto">
                <RenderCardThumbnail />
                <RenderCardThumbnail />
              </div>
            </div>
          </motion.div>

          {/* {populatedTeams.map((team, idx) => (
            <motion.div
              key={idx}
              variants={variants}
              className="overflow-hidden w-full max-w-[1030px] mb-4 text-primary bg-cardsBackground shadow-lg rounded-10  flex flex-col "
            >
              <div className="flex flex-col md:flex-row justify-between items-center h-24 md:h-20 ml-0 md:ml-10">
                <h2 className="h-1/2 md:h-auto flex items-center justify-center">
                  {team.teamName}
                </h2>
                <div className="w-full md:w-52 flex items-center h-1/2 md:h-20 border-t md:border-none border-partnersBorders">
                  <button
                    className="h-full w-2/3 md:w-full border-r md:border-x border-partnersBorders px-2 md:px-4 text-sm hover:border-none hover:bg-cardsDark
                   "
                  >
                    go to dashboard
                  </button>
                  <div
                    className="h-full w-1/3 md:w-20 flex justify-center items-center hover:bg-cardsDark"
                    onClick={() => handleToggle(idx)}
                  >
                    <motion.div
                      animate={{
                        rotateX: openIndex[idx] == false ? 180 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <FontAwesomeIcon icon={faChevronUp} size="sm" />
                    </motion.div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {openIndex[idx] && (
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
                    className=" text-primary"
                  >
                    <div
                      key={idx}
                      className="transition-opacity opacity-80 bg-cardsDark w-full p-px md:p-2 py-8"
                    >
                      <CardsByTeam team={team} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))} */}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Profile;
