import React from 'react';
import type { CoachFormData, Player } from '../../types/CoachesForm';

const ReviewForm = ({
  formData,
  setActiveStep,
}: {
  formData: CoachFormData;
  setActiveStep: (step: number) => void;
}) => {
  const handleEditClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="p-10 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary">Review and Submit</h2>
      <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
      <p className="text-base font-light max-w-475 mb-4">
        <span className="font-semibold">Does everything look correct?</span>{' '}
        Take a moment to review all sections. You can edit any part by clicking
        the &quot;Edit&quot; button next to each category.
      </p>

      {/* Team and Match */}
      <div className="mb-8">
        <h3 className="text-basesm font-bold text-primary mb-2">
          Team and match
        </h3>{' '}
        <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col w-full md:w-1/2  bg-cardsBackground p-4 rounded-10">
            <div className="flex justify-between items-center">
              <p className="my-2 text-base font-bold text-primary">Team</p>
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick(1)}
                  className="text-skyblue"
                >
                  Edit
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm">{formData.team || 'Your team name'}</p>
              <div className="w-full h-1 bg-partnersBorders my-2"></div>
              <p className="my-2 text-base font-bold text-primary">Opponent</p>
              <p className="text-sm">
                {formData.opponentTeam || 'Opponent team name'}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2 bg-cardsBackground p-4 rounded-10">
            <div className="flex justify-between items-center">
              <p className="my-2 text-base font-bold text-primary">Match</p>
              <button
                type="button"
                onClick={() => handleEditClick(1)}
                className="text-skyblue"
              >
                Edit
              </button>
            </div>
            <div>
              {formData.existingMatch !== 'N/A' ? (
                <p className="text-sm">
                  {formData.existingMatch || 'Existing or new match'}
                </p>
              ) : (
                <p className="text-sm">
                  {' '}
                  {formData.team} vs {formData.opponentTeam}{' '}
                </p>
              )}

              <div className="w-full h-1 bg-partnersBorders my-2"></div>
              <p className="my-2 text-base font-bold text-primary">Date</p>
              <p className="text-sm">{formData.matchDate || 'Match Date'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Match Details */}
      <div className="mb-8">
        <h3 className="text-basesm font-bold text-primary mb-2">
          Match Details
        </h3>{' '}
        <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col w-full md:w-1/2 bg-cardsBackground p-4 rounded-10">
            <div className="flex justify-between items-center">
              <p className="my-2 text-base font-bold text-primary">
                Match Type
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => handleEditClick(2)}
                  className="text-skyblue"
                >
                  Edit
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm">
                {formData.matchType || 'Tournament, friendly or league'}
              </p>
              <div className="w-full h-1 bg-partnersBorders my-2"></div>
              <p className="my-1 text-base font-bold text-primary">Venue</p>
              <div className="flex justify-between items-center">
                <p className="text-sm ">
                  {formData.venue || 'Name of location'}
                </p>
                <p className="text-sm bg-cardsDark rounded-10 p-2">
                  {formData.homeAway || 'Home or away'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2 bg-cardsBackground p-4 rounded-10">
            <div className="flex justify-between items-center">
              <p className="my-2 text-base font-bold text-primary">
                Jersey Colors
              </p>
              <button
                type="button"
                onClick={() => handleEditClick(2)}
                className="text-skyblue"
              >
                Edit
              </button>
            </div>
            <div>
              <p className="text-sm">
                {formData.yourTeamColors || 'Your team jersey color'}
              </p>
              <div className="w-full h-1 bg-partnersBorders my-2"></div>
              <p className="my-2 text-base font-bold text-primary">Opponent</p>
              <p className="text-sm">
                {formData.opponentColors || 'Opponent jersey color'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roster */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-basesm font-bold text-primary">Team roster</h3>
          <button
            type="button"
            onClick={() => handleEditClick(3)}
            className="text-skyblue"
          >
            Edit
          </button>
        </div>
        <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
        <div className="flex flex-col w-full bg-cardsBackground p-4 rounded-10">
          <p className="my-2 text-base font-bold text-primary">Players</p>
          <ul>
            {formData.matchRoster?.map((player: Player) => (
              <div key={player.id}>
                <li className="flex justify-between">
                  <p className="text-sm">{player.name}</p>
                  <p className="text-sm">jersey {player.jerseyNumber}</p>
                </li>
                <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
