import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faXmark,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FormData } from '../../types/CoachesForm';
import { FormEvent } from '../../types/CoachesForm';
import { Player } from '../../types/CoachesForm';
import { set } from 'react-datepicker/dist/date_utils';

const TeamRosterForm = ({
  formData,
  handleChange,
}: {
  formData: FormData;
  handleChange: (event: FormEvent) => void;
}) => {
  const [permanentRoster, setPermanentRoster] = useState<Player[]>(
    formData.permanentRoster,
  );

  const [matchRoster, setMatchRoster] = useState<Player[]>(
    formData.matchRoster,
  );
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerJersey, setNewPlayerJersey] = useState('');
  const [addPlayerPermanently, setAddPlayerPermanently] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [jerseyChangeModal, setJerseyChangeModal] = useState(false);
  const [newJerseyNumber, setNewJerseyNumber] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [noteText, setNoteText] = useState('');

  console.log('matchRoster.......', matchRoster);

  const jerseyModalRef = useRef<HTMLDivElement>(null); // Ref for Jersey Modal
  const noteModalRef = useRef<HTMLDivElement>(null); // Ref for Note Modal

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        jerseyModalRef.current &&
        !jerseyModalRef.current.contains(event.target as Node) &&
        jerseyChangeModal
      ) {
        setJerseyChangeModal(false);
      }

      if (
        noteModalRef.current &&
        !noteModalRef.current.contains(event.target as Node) &&
        showNoteModal
      ) {
        setShowNoteModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [jerseyChangeModal, showNoteModal]);

  useEffect(() => {
    setPermanentRoster(formData.permanentRoster);
    setMatchRoster(formData.matchRoster);
  }, [formData]);

  const handleJerseyNumberChangeClick = (player: Player) => {
    setSelectedPlayer(player);
    setNewJerseyNumber(player.jerseyNumber);
    setJerseyChangeModal(true);
    console.log('player', player);
  };

  const handleJerseyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewJerseyNumber(event.target.value);
  };

  const handleJerseyNumberChange = () => {
    if (selectedPlayer) {
      const updatedRoster = matchRoster.map((p) =>
        p.id === selectedPlayer.id
          ? { ...p, jerseyNumber: newJerseyNumber }
          : p,
      );
      setMatchRoster(updatedRoster);
      handleChange({
        target: { name: 'matchRoster', value: updatedRoster },
      });
      setJerseyChangeModal(false);
    }
  };

  const handleAddNoteClick = (player: Player) => {
    setSelectedPlayer(player);
    setShowNoteModal(true);
    setNoteText(player.note || ''); // Pre-fill note if it exists
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(event.target.value);
  };

  const handleAddNote = () => {
    if (selectedPlayer) {
      // Update the player object in the matchRoster state with the new note
      const updatedMatchRoster = matchRoster.map((p) =>
        p.id === selectedPlayer.id ? { ...p, note: noteText } : p,
      );
      setMatchRoster(updatedMatchRoster);
      handleChange({
        target: { name: 'matchRoster', value: updatedMatchRoster },
      });
      // Clear the note and close the modal
      setNoteText('');
      setShowNoteModal(false);
    }
  };

  const handlePlayerSelect = (playerId: number) => {
    const player = permanentRoster.find((p) => p.id === playerId);
    if (player) {
      const playerIndex = matchRoster.findIndex((p) => p.id === playerId);

      if (playerIndex > -1) {
        // Player is already in matchRoster, so remove them
        const updatedRoster = [...matchRoster];
        updatedRoster.splice(playerIndex, 1);
        setMatchRoster(updatedRoster);
        handleChange({
          target: { name: 'matchRoster', value: updatedRoster },
        });
      } else {
        // Player is not in matchRoster, so add them
        setMatchRoster([...matchRoster, player]);
        handleChange({
          target: { name: 'matchRoster', value: [...matchRoster, player] },
        });
      }
    }
  };

  const handlePlayerRemove = (playerId: number) => {
    setMatchRoster(matchRoster.filter((p) => p.id !== playerId));
    handleChange({
      target: {
        name: 'matchRoster',
        value: matchRoster.filter((p) => p.id !== playerId),
      },
    });
  };

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerJersey) {
      const newPlayer = {
        id: permanentRoster.length + 1, // Generate a simple ID
        name: newPlayerName,
        jerseyNumber: newPlayerJersey,
      };

      if (
        (isGuest && addPlayerPermanently) ||
        (!isGuest && !addPlayerPermanently)
      ) {
        setNewPlayerName('');
        setNewPlayerJersey('');
        setAddPlayerPermanently(false);
        setIsGuest(false);
        return;
      }

      if (addPlayerPermanently) {
        setPermanentRoster([...permanentRoster, newPlayer]);
        handleChange({
          target: {
            name: 'permanentRoster',
            value: [...permanentRoster, newPlayer],
          },
        });
      }

      if (isGuest) {
        // Add to match roster if not a guest
        setMatchRoster([...matchRoster, newPlayer]);
        handleChange({
          target: {
            name: 'matchRoster',
            value: [...matchRoster, newPlayer],
          },
        });
      }

      setNewPlayerName('');
      setNewPlayerJersey('');
      setAddPlayerPermanently(false);
      setIsGuest(false);
    }
  };

  return (
    <div className="py-10 px-5 rounded-t-10 bg-cardsDark">
      <h2 className="text-2xl font-bold text-primary">Team Roster</h2>
      <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
      <p className="text-base font-light max-w-[480px] mb-4">
        Who was in your starting lineup? Select players from the list or add new
        ones to complete your match roster. Ensure all participants are included
        before continuing. You can add notes to give context or clarify details.
      </p>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 py-2 md:h-[377px]">
        {/* Permanent Roster */}
        <div className="w-full md:w-1/2 h-full  bg-cardsBackground px-5 py-11 rounded-10">
          <h3 className="text-base font-bold text-primary mb-2">
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
        <div className="w-full md:w-1/2 h-full  bg-cardsBackground p-10 rounded-10">
          <h3 className="text-base font-bold text-primary mb-2">
            Add new player
          </h3>
          <div className="flex flex-col gap-2 justify-center">
            <input
              type="text"
              placeholder="Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <input
              type="text"
              placeholder="Jersey number"
              value={newPlayerJersey}
              onChange={(e) => setNewPlayerJersey(e.target.value)}
              className="shadow appearance-none border rounded w-full mb-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="addPermanently"
                checked={addPlayerPermanently}
                onChange={(e) => {
                  setAddPlayerPermanently(e.target.checked);
                  setIsGuest(false);
                }}
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
                onChange={(e) => {
                  setIsGuest(e.target.checked);
                  setAddPlayerPermanently(false);
                }}
              />
              <label htmlFor="isGuest" className="ml-2 text-sm text-primary">
                Guest
              </label>
            </div>
            <div className="flex justify-end mt-16">
              <button
                type="button"
                onClick={handleAddPlayer}
                className="p-2 rounded-20 border text-primary hover:bg-skyblue shadow-md md:w-2/5"
              >
                add player
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Match Roster */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-primary">Match Roster</h2>
        <div className="w-full h-1 bg-partnersBorders mt-2 mb-4"></div>
        <ul>
          {matchRoster.map((player) => (
            <>
              <li
                key={player.id}
                className="flex items-center justify-between py-2 relative"
              >
                <div className="flex flex-col md:flex-row  justify-start md:justify-between w-1/2">
                  <p className=""> {player.name}</p>
                  <div className="flex gap-2">
                    <p className="">jersey {player.jerseyNumber}</p>
                    <button
                      type="button"
                      onClick={() => handleJerseyNumberChangeClick(player)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="md:mr-2 text-skyblue"
                      />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-2 xs:gap-5 md:gap-10 ml-2 xm-m-0 w-1/2">
                  <div className="">
                    <button
                      type="button"
                      className="text-skyblue hover:text-primary"
                      onClick={() => handleAddNoteClick(player)}
                    >
                      <FontAwesomeIcon
                        icon={faClipboard}
                        className="mr-2 text-skyblue text-lg xs:text-base"
                      />
                      <span className="hidden xs:inline">
                        {' '}
                        {/* Hide text on xs screens */}
                        {player.note ? 'Edit note' : 'Add note'}
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => handlePlayerRemove(player.id)}
                      className="text-chartRed hover:text-primary"
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="mr-2 text-chartRed text-lg xs:text-base"
                      />
                      <span className="hidden xs:inline">
                        {' '}
                        {/* Hide text on xs screens */}
                        Remove
                      </span>
                    </button>
                  </div>
                </div>
              </li>
              <div className="w-full h-1 bg-matchtitles mt-2 mb-4"></div>
            </>
          ))}
        </ul>
      </div>
      {/* Jersey Change Modal */}
      {jerseyChangeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={jerseyModalRef}
            className="bg-cardsBackground p-8 rounded-10 flex flex-col items-center justify-center"
          >
            <h3 className="text-base font-bold text-primary mb-4">
              Change Jersey Number
            </h3>
            <input
              type="text"
              value={newJerseyNumber}
              onChange={handleJerseyChange}
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
      ` text-center"
            />
            <div className="flex justify-center mt-4 gap-2">
              <button
                type="button"
                onClick={() => setJerseyChangeModal(false)}
                className="w-24 py-2 rounded-20 border text-primary hover:bg-skyblue shadow-md px-4"
              >
                cancel
              </button>
              <button
                type="button"
                onClick={handleJerseyNumberChange}
                className="w-24 py-2 rounded-20 border text-primary hover:bg-skyblue shadow-md px-4"
              >
                edit
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={noteModalRef}
            className="w-5/6 md:w-5/12 bg-cardsBackground p-8 rounded-10"
          >
            <h3 className="text-base font-bold text-primary mb-4">Add note</h3>
            <textarea
              value={noteText}
              onChange={handleNoteChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline   
 h-32"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="w-24 py-2 rounded-20 border text-primary hover:bg-skyblue shadow-md px-4"
              >
                cancel
              </button>
              <button
                type="button"
                onClick={handleAddNote}
                className="w-24 py-2 rounded-20 border text-primary hover:bg-skyblue shadow-md px-4"
              >
                add note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamRosterForm;
