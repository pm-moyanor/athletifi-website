import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface TeamMatchFormProps {
  formData: {
    team?: string;
    matchType?: string;
    existingMatch?: string;
    opponentTeam?: string;
    matchDate?: string;
    matchTime?: string;
    // ... other form fields as needed
  };
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const TeamMatchForm: React.FC<TeamMatchFormProps> = ({
  formData,
  handleChange,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isExistingMatchSelectorOpen, setIsExistingMatchSelectorOpen] =
    useState(false);
  const [showExistingMatchForm, setShowExistingMatchForm] = useState(false);
  const [showNewMatchForm, setShowNewMatchForm] = useState(false);

  const handleMatchTypeChange = (matchType: string) => {
    // Create a synthetic event for handleChange
    const syntheticEvent = {
      target: { name: 'matchType', value: matchType },
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(syntheticEvent);

    // Show the corresponding form
    if (matchType === 'existing') {
      setShowExistingMatchForm(true);
      setShowNewMatchForm(false);
    } else if (matchType === 'new') {
      setShowExistingMatchForm(false);
      setShowNewMatchForm(true);
    }
  };

  const [games] = useState([
    'Team 2011',
    'Team 2013',
    // ... add more dummy game data
  ]);

  const [matches] = useState([
    { id: 1, name: 'Chelsea vs Liverpool - 2024/08/24' },
    { id: 2, name: 'Manchester United vs Arsenal - 2024/08/23' },
    { id: 3, name: 'Tottenham vs Manchester City - 2024/08/22' },
    // ... add more dummy matches
  ]);

  const handleGame = () => {
    setIsSelectorOpen(!isSelectorOpen);
  };

  const handleExistingMath = () => {
    setIsExistingMatchSelectorOpen(!isExistingMatchSelectorOpen);
  };

  return (
    <div className="p-10 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary mb-4">Team & Match</h2>
      <div className="mb-4">
        <label
          htmlFor="team"
          className="block text-primary text-sm font-bold mb-5 mt-10"
        >
          Which team are you submitting for?
        </label>

        <div className="shadow relative w-2/6 bg-cardsBackground rounded-10">
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
            <ul className="absolute z-10 w-full bg-cardsBackground mt-1 shadow-md px-5 rounded-b-10">
              {games.map((game) => (
                <li
                  key={game}
                  className="py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    handleChange({
                      target: { name: 'team', value: game },
                    } as React.ChangeEvent<HTMLSelectElement>);
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

      <div className="mb-4">
        <label className="block text-primary text-sm font-bold mb-5 mt-10">
          Is this for an existing scheduled match or a new match entry?
        </label>
        <p className="text-gray-400 text-xs italic mb-2">
          Select if this footage is for an existing match or a new one.
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            name="matchType"
            value="existing"
            onClick={() => handleMatchTypeChange('existing')}
            className={`w-4/12 border hover:border-gray-500 text-primary font-bold py-6 px-4 rounded-10 text-center ${
              formData.matchType === 'existing'
                ? 'bg-skyblue'
                : 'border-gray-300'
            }`}
          >
            Existing match
          </button>
          <button
            type="button"
            name="matchType"
            value="new"
            onClick={() => handleMatchTypeChange('new')}
            className={`w-4/12 border hover:border-gray-500 text-primary font-bold py-6 px-4 rounded-10 text-center ${
              formData.matchType === 'new' ? 'bg-skyblue' : 'border-gray-300'
            }`}
          >
            New match
          </button>
        </div>
      </div>

      {/* Conditionally render the forms */}
      {showExistingMatchForm && (
        <div className="mt-10">
          <label
            htmlFor="existingMatch"
            className="block text-primary text-sm font-bold mb-5"
          >
            Which match are you submitting?
          </label>

          <div className="shadow relative w-2/6 bg-cardsBackground rounded-10">
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
              <ul className="absolute z-10 w-full bg-cardsBackground mt-1 shadow-md px-5 rounded-b-10">
                {matches.map((match) => (
                  <li
                    key={match.id}
                    className="py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      handleChange({
                        target: { name: 'existingMatch', value: match.name }, // Access the 'name' property
                      } as React.ChangeEvent<HTMLSelectElement>);
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
      {showNewMatchForm && (
        <div className="">
          {/* New Match Form Content */}
          <div className="mt-10">
            <label
              htmlFor="opponentTeam"
              className="block text-primary text-sm font-bold mb-5"
            >
              Who was the opposing team?
            </label>
            <input
              type="text"
              id="opponentTeam"
              name="opponentTeam"
              placeholder='Opponent team name'
              value={formData.opponentTeam || ''}
              onChange={handleChange}
              className="shadow relative w-2/6 bg-cardsBackground rounded-10 p-5"
            />
            <p className="text-gray-400 text-xs italic mt-2">
              Enter the name of the opponent
            </p>
          </div>
          <div className="mt-10">
            <label className="block text-primary text-sm font-bold mb-5">
              When did the match take place?
            </label>
            {/* You'll need to add input fields for date, time, and venue */}
            <p className="text-gray-400 text-xs italic">
              Provide the match date, time, and venue where it took place.
            </p>
            <div className="flex items-center gap-4 mt-2"> 
              <input 
                type="date"
                name="matchDate" 
                value={formData.matchDate || ''}
                onChange={handleChange}
                className="shadow appearance-none w-64 py-3 px-3 bg-cardsBackground rounded-10 leading-tight focus:outline-none focus:shadow-outline text-primary color"   
 
              />
              <input
                type="time"
                name="matchTime" 
                value={formData.matchTime || ''}
                onChange={handleChange}
                className="shadow appearance-none w-64 py-3 px-3 bg-cardsBackground rounded-10 leading-tight focus:outline-none focus:shadow-outline text-primary"   

              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMatchForm;
