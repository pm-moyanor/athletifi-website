'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/user-portal/Header';
import Navbar from '@/components/dashboard/NavBar';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';

const populatedTeams = [
  {
    teamName: 'Villanova Soccer Academy',
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
//adjust when integrate data
interface Team {
  teamName: string;
  cards: { id: number }[];
}

//dummy component to render cards by team
const CardsByTeam = ({ team }: { team: Team }) => (
  <div className="flex justify-center md:flex-row flex-wrap items-center md:items-start">
    {team.cards.map((card, index) => (
      <RenderCardThumbnail key={index} />
    ))}
  </div>
);

//motion variants to animate the team bars
const variants = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const Profile = () => {
  const [openIndex, setOpenIndex] = useState<boolean[]>(
    Array(populatedTeams.length).fill(false),
  );

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) =>
      prevIndex.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden "
    >
      <div className="absolute top-0 left-0 bg-gradient-to-r from-cardsDark2 to-cardsBackground h-[280px] lg:h-[330px] w-full -z-10"></div>
      <Navbar />
      <main className="mx-2 md:mx-10 my-32 md:my-36 lg:my-48 text-sm md:text-base">
        <Header pageTitle={'My Cards'} />
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center mt-4 md:pt-7"
        >
          {populatedTeams.map((team, idx) => (
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
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Profile;
