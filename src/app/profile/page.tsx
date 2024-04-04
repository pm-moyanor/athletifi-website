'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/user-portal/Header';
import Navbar from '@/components/dashboard/NavBar';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';

const populatedTeams = [
  {
    teamName: 'Team A',
    cards: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ],
  },
  {
    teamName: 'Team B',
    cards: [
      {
        id: 4,
      },
      {
        id: 5,
      },
    ],
  },
];

const CardsByTeam = ({ team }) => (
  <div className="flex justify-center flex-col md:flex-row flex-wrap items-center md:items-start">
    {team.cards.map((card, index) => (
      <RenderCardThumbnail key={index} />
    ))}
  </div>
);

const Profile = () => {
  const [openIndex, setOpenIndex] = useState(
    Array(populatedTeams.length).fill(false),
  );

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) =>
      prevIndex.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <div className="overflow-hidden ">
      <div className="absolute top-0 left-0 bg-gradient-to-r from-cardsDark2 to-cardsBackground h-[280px] lg:h-[330px] w-full -z-10"></div>
      <Navbar />
      <main className="mx-2 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
        <Header pageTitle={'My Cards'} />
        <div className="flex flex-col items-center mt-4 md:pt-7">
          {populatedTeams.map((team, idx) => (
            <div
              key={idx}
              className="overflow-hidden w-full max-w-[1030px] mb-4 text-primary bg-cardsBackground shadow-lg rounded-10  flex flex-col "
            >
              <div className="flex justify-between items-center h-16 md:h-20 ml-4 md:ml-10">
                <h2>{team.teamName}</h2>
                <div className="flex items-center h-20">
                  <button className="h-full border-x border-partnersBorders px-2 md:px-4 text-sm ">
                    go to dashboard
                  </button>
                  <div
                    className="h-full w-16 md:w-20 flex justify-center items-center"
                    onClick={() => handleToggle(idx)}
                  >
                    <FontAwesomeIcon
                      icon={
                        openIndex[idx] == false ? faChevronDown : faChevronUp
                      }
                      size="xs"
                      className="text-skyblues"
                    />
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
                    className=" text-primary "
                  >
                    <div
                      key={idx}
                      className="transition-opacity opacity-80 bg-cardsDark w-full p-4 py-8"
                    >
                      <CardsByTeam team={team} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;
