import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChevronDown,
  faChevronUp,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { FormData } from '../../types/CoachesForm.type';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TeamMatchForm = ({
  formData,
  handleChangeTeamMatch,
}: {
  formData: FormData;
  handleChangeTeamMatch: (name: keyof FormData, value: string) => void;
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isExistingMatchSelectorOpen, setIsExistingMatchSelectorOpen] =
    useState(false);

  const handleMatchTypeChange = (newOrExistingMatch: 'existing' | 'new') => {
    if (newOrExistingMatch === 'existing') {
      handleChangeTeamMatch('opponentTeam', '');
      handleChangeTeamMatch('matchDate', '');
      handleChangeTeamMatch('matchTime', '');
      handleChangeTeamMatch('newOrExistingMatch', 'existing');
    } else if (newOrExistingMatch === 'new') {
      handleChangeTeamMatch('existingMatch', '');
      handleChangeTeamMatch('newOrExistingMatch', 'new');
    }
  };

  const games = [
    'Team 2011',
    'Team 2013',
    // ... add more dummy game data
  ];

  const matches = [
    { id: 1, name: 'Chelsea vs Liverpool - 2024/08/24' },
    { id: 2, name: 'Manchester United vs Arsenal - 2024/08/23' },
    { id: 3, name: 'Tottenham vs Manchester City - 2024/08/22' },
    // ... add more dummy matches
  ];

  const handleGame = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  const handleExistingMath = () => {
    setIsExistingMatchSelectorOpen(!isExistingMatchSelectorOpen);
  };

  return (
    <div className="p-10 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary">Team & Match</h2>
      <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
      <div className="">
        <label
          htmlFor="team"
          className="block text-primary text-base font-bold mb-5 mt-10"
        >
          Which team are you submitting for?
        </label>

        <div className="shadow relative w-full xs:w-3/4 md:w-1/2  bg-cardsBackground rounded-10">
          <div // Changed from select to div
            id="team"
            className={`appearance-none bg-cardsBackground py-5 text-primary leading-tight focus:outline-none focus:shadow-outline px-5 cursor-pointer flex justify-between items-center ${isSelectorOpen ? 'rounded-t-10' : 'rounded-10'}`}
            onClick={handleGame} // Added onClick to the main div
          >
            <span>{formData.team || 'Select a team'}</span>{' '}
            {/* Display selected team */}
            <FontAwesomeIcon
              icon={isSelectorOpen ? faChevronUp : faChevronDown}
            />
          </div>
          {isSelectorOpen && ( // Conditionally render the list
            <ul className="absolute z-10 w-full bg-cardsBackground mt-1 shadow-md rounded-b-10">
              {games.map((game) => (
                <li
                  key={game}
                  className="py-2 px-5 hover:bg-cardsDark w-full cursor-pointer"
                  onClick={() => {
                    handleChangeTeamMatch('team', game);
                    setIsSelectorOpen(false);
                  }}
                >
                  {game}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-gray-400 text-xs italic my-2">
          If your team isn't listed, contact * to have it added.
        </p>
      </div>
      <div className="w-full h-1 bg-partnersBorders my-10"></div>
      <div className="">
        <label className="block text-primary text-base font-bold mb-5">
          Is this for an existing scheduled match or a new match entry?
        </label>
        <p className="text-gray-400 text-xs italic mb-2">
          Select if this footage is for an existing match or a new one.
        </p>
        <div className="flex flex-col xs:flex-row items-center gap-4 ">
          <button
            type="button"
            name="newOrExistingMatch"
            value="existing"
            onClick={() => handleMatchTypeChange('existing')}
            className={`text-xs md:text-base w-full xs:w-2/6 border hover:border-gray-500 text-primary font-bold py-10 px-4 rounded-10 text-center whitespace-nowrap ${
              formData.newOrExistingMatch === 'existing'
                ? 'bg-skyblue'
                : 'border-gray-300'
            }`}
          >
            Existing match
          </button>
          <button
            type="button"
            name="newOrExistingMatch"
            value="new"
            onClick={() => handleMatchTypeChange('new')}
            className={`text-xs md:text-base w-full xs:w-2/6 border hover:border-gray-500 text-primary font-bold py-10 px-4 rounded-10 text-center whitespace-nowrap ${
              formData.newOrExistingMatch === 'new'
                ? 'bg-skyblue'
                : 'border-gray-300'
            }`}
          >
            New match
          </button>
        </div>
      </div>

      {/* Conditionally render the forms */}
      {formData.newOrExistingMatch === 'existing' && (
        <div className="mt-10">
          <label
            htmlFor="existingMatch"
            className="block text-primary text-base font-bold mb-5"
          >
            Which match are you submitting?
          </label>

          <div className="shadow relative w-full xs:w-3/4 md:w-1/2  bg-cardsBackground rounded-10">
            <div // Changed from select to div
              id="team"
              className={`appearance-none bg-cardsBackground py-5 text-primary leading-tight focus:outline-none focus:shadow-outline px-5 cursor-pointer flex justify-between items-center ${isExistingMatchSelectorOpen ? 'rounded-t-10' : 'rounded-10'}`}
              onClick={handleExistingMath} // Added onClick to the main div
            >
              <span> {formData.existingMatch || 'Select a match'}</span>{' '}
              {/* Display selected team */}
              <FontAwesomeIcon
                icon={isSelectorOpen ? faChevronUp : faChevronDown}
              />
            </div>
            {isExistingMatchSelectorOpen && ( // Conditionally render the list
              <ul className="absolute z-10 w-full bg-cardsBackground mt-1 shadow-md rounded-b-10">
                {matches.map((match) => (
                  <li
                    key={match.id}
                    className="py-2 px-5 hover:bg-cardsDark w-full cursor-pointer"
                    onClick={() => {
                      handleChangeTeamMatch('existingMatch', match.name);
                      setIsExistingMatchSelectorOpen(false);
                    }}
                  >
                    {match.name} {/* Display the 'name' property */}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-gray-400 text-xs italic mt-2">
            If you don't see your match, try selecting "New Match" instead.
          </p>
        </div>
      )}
      {formData.newOrExistingMatch === 'new' && (
        <div className="">
          {/* New Match Form Content */}
          <div className="mt-10">
            <label
              htmlFor="opponentTeam"
              className="block text-primary text-base font-bold mb-5"
            >
              Who was the opposing team?
            </label>
            <input
              type="text"
              id="opponentTeam"
              name="opponentTeam"
              placeholder="Opponent team name"
              value={formData.opponentTeam || ''}
              onChange={(e) =>
                handleChangeTeamMatch('opponentTeam', e.target.value)
              }
              className="shadow relative w-full xs:w-3/4 md:w-1/2  bg-cardsBackground rounded-10 p-5"
            />
            <p className="text-gray-400 text-xs italic mt-2">
              Enter the name of the opponent
            </p>
          </div>
          <div className="mt-10">
            <label className="block text-primary text-base font-bold mb-5">
              When did the match take place?
            </label>
            {/* You'll need to add input fields for date, time, and venue */}
            <p className="text-gray-400 text-xs italic">
              Provide the match date, time, and venue where it took place.
            </p>
            <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-4 mt-2">
              <div className=" flex items-center justify-center shadow appearance-none w-64 py-3 px-3 bg-cardsBackground rounded-10 leading-tight focus:outline-none focus:shadow-outline">
                <DatePicker
                  selected={
                    formData.matchDate
                      ? new Date(formData.matchDate + 'T00:00:00')
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                      // Format as YYYY-MM-DD for storage
                      const formattedDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000,
                      )
                        .toISOString()
                        .split('T')[0];
                      handleChangeTeamMatch('matchDate', formattedDate);
                    } else {
                      handleChangeTeamMatch('matchDate', '');
                    }
                  }}
                  dateFormat="dd-MM-yyyy" // This controls how the date appears in the input
                  placeholderText="DD-MM-YYYY"
                  className="bg-cardsBackground"
                />
                <FontAwesomeIcon icon={faCalendar} className="" />
              </div>
              <div className=" flex items-center justify-center shadow appearance-none w-64 py-3 px-3 bg-cardsBackground rounded-10 leading-tight focus:outline-none focus:shadow-outline">
                <DatePicker
                  selected={(() => {
                    if (!formData.matchTime) return null;

                    // Try to parse the time string
                    try {
                      // Create today's date with the specified time
                      const today = new Date();
                      const [hours, minutes] = formData.matchTime.split(':');
                      today.setHours(parseInt(hours, 10));
                      today.setMinutes(parseInt(minutes, 10));
                      return today;
                    } catch (error) {
                      // If parsing fails, return null
                      return null;
                    }
                  })()}
                  onChange={(time) => {
                    if (!time) {
                      handleChangeTeamMatch('matchTime', '');
                      return;
                    }

                    try {
                      const formattedTime = time
                        .toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        .replace(/\s/g, ' '); // Normalize spaces

                      handleChangeTeamMatch('matchTime', formattedTime);
                    } catch (error) {
                      console.error('Error formatting time:', error);
                      handleChangeTeamMatch('matchTime', '');
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="HH:MM AM/PM"
                  className="bg-cardsBackground"
                  strictParsing={false}
                />
                <FontAwesomeIcon icon={faClock} className="" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMatchForm;
