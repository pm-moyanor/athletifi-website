import React, { useState } from 'react';

interface TeamRosterFormProps {
  formData: {
    permanentRoster?: { id: number; name: string; jerseyNumber: string }[];
    matchRoster?: { id: number; name: string; jerseyNumber: string }[];
    // ... other form fields as needed
  };
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

const TeamRosterForm: React.FC<TeamRosterFormProps> = ({
  formData,
  handleChange,
}) => {
  const [permanentRoster, setPermanentRoster] = useState([
    { id: 1, name: 'Anderson Rodriguez', jerseyNumber: '#08' },
    { id: 2, name: 'Andrew Gilmore', jerseyNumber: '#06' },
    { id: 3, name: 'Salvador Carrillo', jerseyNumber: '#10' },
    { id: 4, name: 'Joseph Valdez', jerseyNumber: '#10' },
    { id: 5, name: 'Andrew Guilmore', jerseyNumber: '#10' },
    // ... more dummy data
  ]);

  const [matchRoster, setMatchRoster] = useState<
    { id: number; name: string; jerseyNumber: string }[]
  >([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerJersey, setNewPlayerJersey] = useState('');
  const [addPlayerPermanently, setAddPlayerPermanently] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const handlePlayerSelect = (playerId: number) => {
    const player = permanentRoster.find((p) => p.id === playerId);
    if (player) {
      const playerIndex = matchRoster.findIndex((p) => p.id === playerId);

      if (playerIndex > -1) {
        // Player is already in matchRoster, so remove them
        const updatedRoster = [...matchRoster];
        updatedRoster.splice(playerIndex, 1);
        setMatchRoster(updatedRoster);
      } else {
        // Player is not in matchRoster, so add them
        setMatchRoster([...matchRoster, player]);
      }
    }
  };

  const handlePlayerRemove = (playerId: number) => {
    setMatchRoster(matchRoster.filter((p) => p.id !== playerId));
  };

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerJersey) {
      const newPlayer = {
        id: permanentRoster.length + 1, // Generate a simple ID
        name: newPlayerName,
        jerseyNumber: newPlayerJersey,
      };

      if (isGuest && addPlayerPermanently) {
        alert('Please select only one option: Add permanently or as a guest');
        setNewPlayerName('');
        setNewPlayerJersey('');
        setAddPlayerPermanently(false);
        setIsGuest(false);
        return;
      }

      if (addPlayerPermanently) {
        setPermanentRoster([...permanentRoster, newPlayer]);
      }

      if (isGuest) {
        // Add to match roster if not a guest
        setMatchRoster([...matchRoster, newPlayer]);
      }

      setNewPlayerName('');
      setNewPlayerJersey('');
      setAddPlayerPermanently(false);
      setIsGuest(false);
    }
  };

  return (
    <div className="p-10 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary mb-4">Team Roster</h2>
      <p className="text-base font-light max-w-[480px] mb-4">
        Who was in your starting lineup? Select players from the list or add new
        ones to complete your match roster. Ensure all participants are included
        before continuing. You can add notes to give context or clarify details.
      </p>

      <div className="flex gap-4">
        {/* Permanent Roster */}
        <div className="w-1/2 bg-cardsBackground p-10 rounded-t-10">
          <h3 className="text-lg font-bold text-primary mb-2">
            Permanent Roster
          </h3>
          <div className="max-h-64 overflow-y-auto">
            <table className="w-full">
              <tbody>
                {permanentRoster.map((player) => (
                  <tr key={player.id} className="border-b border-gray-600">
                    <td className="py-4 px-2">
                      <input
                        type="checkbox"
                        onChange={() => handlePlayerSelect(player.id)}
                        checked={matchRoster.some((p) => p.id === player.id)}
                      />
                    </td>
                    <td className="py-4 px-2">{player.name}</td>
                    <td className="py-4 px-2">{player.jerseyNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Player */}
        <div className="w-1/2  bg-cardsBackground p-10 rounded-t-10">
          <h3 className="text-lg font-bold text-primary mb-2">
            Add new player
          </h3>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              placeholder="Jersey number"
              value={newPlayerJersey}
              onChange={(e) => setNewPlayerJersey(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="addPermanently"
                checked={addPlayerPermanently}
                onChange={(e) => setAddPlayerPermanently(e.target.checked)}
              />
              <label
                htmlFor="addPermanently"
                className="ml-2 text-sm text-primary"
              >
                Add permanently to roster
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isGuest"
                checked={isGuest}
                onChange={(e) => setIsGuest(e.target.checked)}
              />
              <label htmlFor="isGuest" className="ml-2 text-sm text-primary">
                Guest
              </label>
            </div>
            <button
              type="button"
              onClick={handleAddPlayer}
              className="bg-skyblue  rounded-[10px] text-darkgray hover:text-skyblue hover:bg-cardsDark shadow-md"
            >
              add player
            </button>
          </div>
        </div>
      </div>

      {/* Match Roster */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-primary mb-2">Match Roster</h3>
        <ul>
          {matchRoster.map((player) => (
            <li
              key={player.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                {player.name} - jersey {player.jerseyNumber}
              </div>
              <div className="flex gap-2">
                <button type="button" className="text-skyblue">
                  add note
                </button>
                <button
                  type="button"
                  onClick={() => handlePlayerRemove(player.id)}
                  className="text-chartRed hover:text-primary"
                >
                  remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamRosterForm;
