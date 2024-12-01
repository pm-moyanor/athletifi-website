import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FormData } from '../../types/CoachesForm';
import { FormEvent } from '../../types/CoachesForm';

const MatchDetailsForm = ({
  formData,
  handleChange,
}: {
  formData: FormData;
  handleChange: (event: FormEvent) => void;
}) => {
  const [isMatchTypeSelectorOpen, setIsMatchTypeSelectorOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [teamColors, setTeamColors] = useState({
    yourTeam: '',
    opponent: '',
  });
  console.log('formData.venue', formData.venue);

  const matchTypes = ['Tournament', 'Friendly', 'League'];

  const handleMatchTypeClick = () => {
    setIsMatchTypeSelectorOpen(!isMatchTypeSelectorOpen);
  };

  const handleLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (location.trim()) {
      handleChange({ target: { name: 'venue', value: location } });
      setLocation('');
    }
  };

  const handleTeamColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Update your team color if it has changed
    if (teamColors.yourTeam.trim()) {
      // Only requires this one color
      handleChange({
        target: { name: 'yourTeamColors', value: teamColors.yourTeam },
      });
      setTeamColors((prev) => ({
        ...prev,
        yourTeam: '', // Only clears this one field
      }));
    }

    // Update opponent color if it has changed
    if (teamColors.opponent.trim()) {
      // Only requires this one color
      handleChange({
        target: { name: 'opponentColors', value: teamColors.opponent },
      });
      setTeamColors((prev) => ({
        ...prev,
        opponent: '', // Only clears this one field
      }));
    }
  };

  return (
    <div className="p-10 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary">Match Setup</h2>
      <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>

      {/* Match Type Section */}
      <div>
        <label
          htmlFor="matchType"
          className="block text-primary text-base font-bold mb-5 mt-10"
        >
          What type of match was this?
        </label>
        <p className="text-gray-400 text-xs italic mb-2">
          Select the match type (tournament, friendly, etc.) for accurate
          categorization.
        </p>
        <div className="shadow relative w-full xs:w-3/4 md:w-1/2 bg-cardsBackground rounded-10">
          <div
            id="matchType"
            className={`appearance-none bg-cardsBackground py-5 text-primary leading-tight focus:outline-none focus:shadow-outline px-5 cursor-pointer flex justify-between items-center ${isMatchTypeSelectorOpen ? 'rounded-t-10' : 'rounded-10'}`}
            onClick={handleMatchTypeClick}
          >
            <span>{formData.matchType || 'Select a match type'}</span>
            <FontAwesomeIcon
              icon={isMatchTypeSelectorOpen ? faChevronUp : faChevronDown}
            />
          </div>
          {isMatchTypeSelectorOpen && (
            <ul className="absolute z-10 w-full bg-cardsBackground mt-1 shadow-md rounded-b-10">
              {matchTypes.map((type) => (
                <li
                  key={type}
                  className="py-2 px-5 hover:bg-cardsDark w-full cursor-pointer"
                  onClick={() => {
                    handleChange({
                      target: { name: 'matchType', value: type },
                    });
                    setIsMatchTypeSelectorOpen(false);
                  }}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-full h-1 bg-partnersBorders my-10"></div>

      {/* Venue Section */}
      <div className="mb-4">
        <label
          htmlFor="venue"
          className="block text-primary text-base font-bold mb-5"
        >
          What venue was the match?
        </label>
        <div className="flex shadow relative w-full xs:w-3/4 md:w-1/2 bg-cardsBackground rounded-10">
          <input
            type="text"
            id="venue"
            name="venue"
            placeholder={formData.venue || 'Enter the venue'}
            value={location} // Access value from formData
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none w-full bg-cardsBackground rounded-10 py-5 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleLocation}
            className={`${
              formData.venue && !location ? 'text-black bg-green-500' : ''
            } p-4 rounded-r-10 shadow focus:shadow-outline`}
          >
            <FontAwesomeIcon icon={faCheck} size="xl" />
          </button>
        </div>
      </div>

      {/* Home/Away Section */}
      <div className="mb-4">
        <h3 className="block text-primary text-base font-bold mb-5 mt-10">
          Was this a home or away game?
        </h3>
        <p className="text-gray-400 text-xs italic mb-2">
          Choose if the match was played at home or away to track location-based
          performance.
        </p>
        <div className="flex items-center gap-4">
          {['Home', 'Away'].map((option) => (
            <button
              key={option}
              type="button"
              name="homeAway"
              value={option}
              onClick={() =>
                handleChange({ target: { name: 'homeAway', value: option } })
              }
              className={`w-4/12 border hover:border-gray-500 text-primary font-bold py-6 px-4 rounded-10 text-center ${
                formData.homeAway === option ? 'bg-skyblue' : 'border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Team Colors Section */}
      <div className="mb-4">
        <h3 className="block text-primary text-base font-bold mb-5 mt-10">
          What colors did each team wear?
        </h3>
        <p className="text-gray-400 text-xs italic mb-2">
          Enter the colors worn by both teams for easy identification.
        </p>
        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
          <input
            id="yourTeamColors"
            name="yourTeamColors"
            type="text"
            placeholder={formData.yourTeamColors || 'Your Team'}
            className="shadow appearance-none bg-cardsBackground py-5 text-primary leading-tight focus:outline-none focus:shadow-outline px-5 cursor-pointer w-full xs:w-3/4 md:w-4/12 rounded-10"
            value={teamColors.yourTeam}
            onChange={(e) =>
              setTeamColors({ ...teamColors, yourTeam: e.target.value })
            }
          />
          <input
            id="opponentColors"
            name="opponentColors"
            placeholder={formData.opponentColors || 'Opponent'}
            type="text"
            className="shadow appearance-none bg-cardsBackground py-5 text-primary leading-tight focus:outline-none focus:shadow-outline px-5 cursor-pointer w-full xs:w-3/4 md:w-4/12 rounded-10"
            value={teamColors.opponent}
            onChange={(e) =>
              setTeamColors({ ...teamColors, opponent: e.target.value })
            }
          />
          <button
            type="button"
            onClick={handleTeamColors}
            className={`${
              formData.yourTeamColors &&
              formData.opponentColors &&
              !teamColors.yourTeam &&
              !teamColors.opponent
                ? 'text-black bg-green-500'
                : ''
            } p-4 rounded-10 shadow focus:shadow-outline bg-cardsBackground`}
          >
            <FontAwesomeIcon icon={faCheck} size="xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsForm;
