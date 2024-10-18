import React, { useState } from 'react';

interface TeamMatchFormProps {
  formData: {
    team?: string;
    matchType?: string;
    existingMatch?: string;
    opponentTeam?: string;
    // ... other form fields as needed
  };
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const TeamMatchForm: React.FC<TeamMatchFormProps> = ({
  formData,
  handleChange,
}) => {
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

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="team" className="block text-white text-sm font-bold mb-2">
          Which team are you submitting for?
        </label>
        <select
          id="team"
          name="team"
          value={formData.team || ''}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a team</option>
          <option value="Team 2011">Team 2011</option>
          <option value="Team 2013">Team 2013</option>
          {/* Add more team options as needed */}
        </select>
        <p className="text-gray-400 text-xs italic">
          If your team isn't listed, contact * to have it added.
        </p>
      </div>

      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
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
            className={`border hover:border-gray-500 text-gray-300 font-bold py-2 px-4 rounded-full text-center ${
              formData.matchType === 'existing'
                ? 'border-blue-500'
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
            className={`border hover:border-gray-500 text-gray-300 font-bold py-2 px-4 rounded-full text-center ${
              formData.matchType === 'new' ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            New match
          </button>
        </div>
      </div>

      {/* Conditionally render the forms */}
      {showExistingMatchForm && (
        <div>
          {/* Existing Match Form Content */}
          <label
            htmlFor="existingMatch"
            className="block text-white text-sm font-bold mb-2"
          >
            Which match are you submitting?
          </label>
          <select
            id="existingMatch"
            name="existingMatch"
            value={formData.existingMatch || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a match</option>
            <option value="Chelsea vs Liverpool - 2024/08/24">
              Chelsea vs Liverpool - 2024/08/24
            </option>
            {/* Add more match options as needed */}
          </select>
          <p className="text-gray-400 text-xs italic">
            If you don't see your match, try selecting "New Match" instead.
          </p>
        </div>
      )}

      {showNewMatchForm && (
        <div>
          {/* New Match Form Content */}
          <div className="mb-4">
            <label
              htmlFor="opponentTeam"
              className="block text-white text-sm font-bold mb-2"
            >
              Who was the opposing team?
            </label>
            <input
              type="text"
              id="opponentTeam"
              name="opponentTeam"
              value={formData.opponentTeam || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-gray-400 text-xs italic">
              Enter the name of the opponent
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              When did the match take place?
            </label>
            {/* You'll need to add input fields for date, time, and venue */}
            <p className="text-gray-400 text-xs italic">
              Provide the match date, time, and venue where it took place.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMatchForm;
