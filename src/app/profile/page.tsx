'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Header from '@/components/user-portal/Header';
import Navbar from '@/components/dashboard/NavBar';

const populatedTeams = [
  {
    teamName: 'Team A',
    cards: [
      {
        id: 1,
        playerName: 'Player 1',
        playerClub: 'Club A',
        playerTeam: 'Team A',
        playerCard: 'Gold',
      },
      {
        id: 2,
        playerName: 'Player 2',
        playerClub: 'Club B',
        playerTeam: 'Team A',
        playerCard: 'Silver',
      },
    ],
  },
  {
    teamName: 'Team B',
    cards: [
      {
        id: 3,
        playerName: 'Player 3',
        playerClub: 'Club C',
        playerTeam: 'Team B',
        playerCard: 'Bronze',
      },
      {
        id: 4,
        playerName: 'Player 4',
        playerClub: 'Club D',
        playerTeam: 'Team B',
        playerCard: 'Gold',
      },
    ],
  },
];

const CardsByTeam = ({ team }) => {
  console.log(team);
  return (
    <div className="text-primary w-full bg-cardsDark h-28 rounded-10 py-8 flex flex-col px-10">
      <div className="flex justify-between items-center">
        <h2>{team.teamName}</h2>

        <FontAwesomeIcon icon={faArrowDown} size="xs" />
      </div>
      <div className="flex">
        {team.cards.map((card, index) => (
          <div key={index} className="flex ">
            <div className="flex flex-col w-48 h-48 border m-4">
              <p> {card.playerName}</p>
              <p>{card.playerClub}</p>
              <p>{card.playerTeam}</p>
              <p>{card.playerCard}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="mt-24">
        <Header pageTitle={'My Cards'} />
        <div>
          {populatedTeams.map((team, index) => (
            <h3 key={index} className="text-primary">
              <div className="border h-96">
                <CardsByTeam team={team} />
              </div>
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
