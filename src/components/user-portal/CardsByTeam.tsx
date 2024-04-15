interface Card {
  id: string;
}

interface Team {
  teamName: string;
  cards: Card[];
}

interface CardsByTeamProps {
  team: Team[];
}

const CardsByTeam = ({ team }: CardsByTeamProps) => (
  <div>
    {team.map((teamItem, index) => (
      <div key={index}>
        <h2>{teamItem.teamName}</h2>
        {teamItem.cards.map((card, cardIndex) => (
          <div key={cardIndex}>
            <p>{card.id}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default CardsByTeam;
