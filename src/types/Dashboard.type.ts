export type PlayerDashboardProps = {
  params: { cardId: number };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export enum Attributes {
  Attacking = 'attacking',
  Skill = 'skill',
  Physical = 'physical',
  Mental = 'mental',
  Defending = 'defending',
}

export interface ProfileProps {
  age: number | null;
  club: string | null;
  league: string | null;
  teamName: string | null;
  ageGroup: string | null;
  gender: string | null;
  coach: string | null;
  bio: string | null;
}

export const emptyProfileProps: ProfileProps = {
  age: null,
  club: null,
  league: null,
  teamName: null,
  ageGroup: null,
  gender: null,
  coach: null,
  bio: null,
};

export interface IPlayerRatingProps {
  playerRating: number | null;
}

export interface IBarProps {
  click: Attributes | undefined | null;
  hover: Attributes | undefined | null;
}

export interface ILineProps {
  attacking?: boolean;
  skill?: boolean;
  physical?: boolean;
  mental?: boolean;
  defending?: boolean;
  hover: Attributes | undefined | null;
}
