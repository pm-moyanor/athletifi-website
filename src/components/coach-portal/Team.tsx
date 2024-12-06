'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import TeamDashboard from './PlayersView';
import MatchesView from './MatchesView';

const Team: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'players' | 'matches'>('players'); // Default to 'players'

  // Toggle which view is open
  const handleViewChange = (newView: 'players' | 'matches') => {
    if (view === newView && isOpen) {
      setIsOpen(false);
    } else {
      setView(newView);
      setIsOpen(true);
    }
  };

  // Animation variants for container expand/collapse
  const containerVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    collapsed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="m-6 rounded-lg min-h-[250px] overflow-hidden bg-cardsBackground text-primary border border-darkerSkyBlue border-opacity-10 max-w-[1030px] mx-auto shadow-md">
      {/* Placeholder for the Club and Team */}
      <div className="flex flex-col md:flex-row justify-evenly md:justify-between items-center border-b-[1px] border-darkerSkyBlue border-opacity-10 h-36 md:h-20">
        <div className="flex items-center gap-2 ml-4 my-6 md:my-0 mr-auto h-full w-full">
          <div className="w-12 h-12 bg-partnersBorders"></div>
          <h2 className="text-base">Villanova Soccer Academy</h2>
        </div>

        {/*  Submit Footage */}
        <motion.div className="flex h-full px-2 justify-end w-full mb-4 md:mb-0">
          {/* Submit Footage Button */}
          <div className="h-full flex gap-2  px-6 items-center font-light cursor-pointer">
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              size="lg"
              className="text-opacity-80"
            />
            <p className="-ml-[2px] mt-[4px] text-sm">Submit Footage</p>
          </div>
        </motion.div>
      </div>

      <div className="flex relative justify-between flex-col md:flex-row md:items-center px-4 pt-8  cursor-pointer">
        {/* Placeholder for the Team and Card */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-8 md:ml-4 w-full">
          <div className="w-40 h-48 bg-gray-700 rounded-md">stack of cards</div>
          <h2 className="text-basemd font-semibold">Team 2016</h2>
        </div>
        {/* toggle btns */}
        <div className=" flex justify-center md:justify-end gap-1 mt-auto w-full">
          <button
            className={`rounded-t-md w-36 h-12 px-3 py-2 bord text-sm bg-cardsDark ${view === 'matches' ? '' : 'opacity-80'}`}
            onClick={() => handleViewChange('players')}
          >
            Players
          </button>
          <button
            className={`bg-cardsDark rounded-t-md w-36 h-12 px-3 py-2 text-sm ${view === 'matches' ? '' : 'opacity-80'}`}
            onClick={() => handleViewChange('matches')}
          >
            Matches
          </button>
        </div>
      </div>

      {/* Container for the players/matches view */}
      <motion.div
        initial={false}
        animate={isOpen ? 'open' : 'collapsed'}
        variants={containerVariants}
        className="bg-cardsBackground border-t border-partnersBorders border-opacity-10"
      >
        {isOpen && (
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-between items-center py-8 px-2 rounded bg-cardsDark"
          >
            {view === 'players' ? <TeamDashboard /> : <MatchesView />}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Team;
