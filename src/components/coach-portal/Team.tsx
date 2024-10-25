'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

  faMagnifyingGlass,
  faPenToSquare,
  faCloudArrowUp,  // Add this icon for Submit Footage
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true) // For expanding/collapsing
  const [view, setView] = useState<'players' | 'matches'>('players'); // Default to 'players'


  // Function to handle view change and toggle open/close
  const handleViewChange = (newView: 'players' | 'matches') => {
    if (view === newView && isOpen) {
      setIsOpen(false); // If clicking the same button again, collapse
    } else {
      setView(newView); // Switch to the new view
      setIsOpen(true); // the container opens when switching
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
      <div className="flex flex-col md:flex-row justify-evenly md:justify-between items-center border-b-[1px] border-darkerSkyBlue border-opacity-10 h-32 md:h-20">
        <div className='flex items-center gap-2 ml-4 my-3 md:my-0 mr-auto h-full'> 
          <div className="w-12 h-12 bg-partnersBorders"></div>
          <h2 className="text-sm">Villanova Soccer Academy</h2>
          </div>
       
            {/* Action buttons (Search, Submit Footage, Edit) */}
            <motion.div className="flex  h-36 md:h-full w-full md:w-auto justify-between px-2 md:justify-end border-t md:border-t-0 border-darkerSkyBlue border-opacity-10">
        
            <div className='w-1 h-full hidden md:block md:bg-darkerSkyBlue opacity-10 mr-10'></div>
            {/* Submit Footage Button */}
            <div className="h-full flex gap-2 px-6 items-center font-light cursor-pointer">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                size="lg"
                className="text-opacity-80"
              />
              <p className="-ml-[2px] mt-[4px] text-sm">Submit Footage</p>
            </div>
            <div className='w-1 h-full bg-darkerSkyBlue opacity-10 mx-2 md:mx-12'></div>
               {/* Search Input */}
             
              <div className="gap-[6px] flex items-center mx-auto md:mr-12">
              <div className=" flex justify-center items-center -mb-[3px] ">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  className="text-opacity-80"
                />
              </div>
              <p className='mt-[4px] text-sm font-light'>Search</p>
              {/* <input
                type="search"
                className="border focus:outline-none focus:ring-0 p-4 rounded-full bg-transparent text-primary text-sm"
                placeholder="Search"
              /> */}
           
            </div>
            {/* Edit Button --DO WE NEED EDIT?
            <div className="flex gap-2 items-center font-light mr-2 cursor-pointer">
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                className="text-opacity-80"
              />
              <p className="-ml-[2px] mt-[4px]">Edit</p>
            </div> */}
          
           
          </motion.div>
      </div>

      <div
        className="flex justify-between flex-col md:flex-row md:items-center px-4 pt-8 pb-4 cursor-pointer"
      >
        {/* Placeholder for the Team and Card */}
        <div className="flex flex-col md:flex-row items-center gap-4 my-4 md:ml-4">
          <div className="w-24 h-32 bg-gray-500 rounded-md">stack of cards</div>
          <h2 className="text-basemd font-semibold">Team 2016</h2>
        </div>
        <div className="flex justify-end md:ml-6 gap-2 md:gap-4 mt-10 md:mt-auto">
            <button
              className={`w-36 h-10 px-3 py-2 rounded-full text-sm ${view === 'players' ? 'border border-skyblue' :  'border border-skyblue border-opacity-10'}`}
              onClick={() => handleViewChange('players')}
            >Players</button>
            <button
              className={`w-36 h-10 px-3 py-2 rounded-full text-sm ${view === 'matches' ? 'border border-skyblue' : 'border border-skyblue border-opacity-10'}`}
              onClick={() => handleViewChange('matches')}
            >Matches</button>
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
            {view === 'players' ? 'Players view' : 'Matches view'}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Team;
