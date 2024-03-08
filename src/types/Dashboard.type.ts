import type { Payload } from 'recharts/types/component/DefaultLegendContent';

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

export interface IAttributeConfig {
  attacking: {
    color: string;
    description: string;
  };
  skill: {
    color: string;
    description: string;
  };
  physical: {
    color: string;
    description: string;
  };
  mentality: {
    color: string;
    description: string;
  };
  defending: {
    color: string;
    description: string;
  };
}

export interface IProfileProps {
  name?: string | null;
  playerNumber?: string | null;
  age?: number | null;
  club?: string | null;
  club_logo?: string | null;
  league?: string | null;
  team?: string | null;
  ageGroup?: string | null;
  gender?: string | null;
  coach?: string | null;
  bio?: string | null;
  player_card_url?: string | null;
}

export const emptyProfileProps: IProfileProps = {
  name: null,
  playerNumber: null,
  age: null,
  club: null,
  club_logo: null,
  league: null,
  team: null,
  ageGroup: null,
  gender: null,
  coach: null,
  bio: null,
  player_card_url: null,
};

export interface IRating {
  attribute?: string;
  rating?: number;
}

export interface IRatingProps {
  overallPlayerRating: number | null;
  playerRatings?: IRating[];
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

export interface ILegendProps {
  payload?: Payload[];
}

export interface ILatestMatchData {
  datetime: string | null;
  location: string | null;
  weather: string | null;
  home_team_name: string | null;
  home_team_logo_url: string | null;
  home_team_score: number | null;
  away_team_name: string | null;
  away_team_logo_url: string | null;
  away_team_score: number | null;
}

export const emptyLatestMatchData: ILatestMatchData = {
  datetime: null,
  location: null,
  weather: null,
  home_team_name: null,
  home_team_logo_url: null,
  home_team_score: null,
  away_team_name: null,
  away_team_logo_url: null,
  away_team_score: null,
};
