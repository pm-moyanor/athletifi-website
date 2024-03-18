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
  clubLogo?: string | null;
  league?: string | null;
  team?: string | null;
  agegroup?: string | null;
  gender?: string | null;
  coach?: string | null;
  bio?: string | null;
  playerCardUrl?: string | null;
}

export const emptyProfileProps: IProfileProps = {
  name: null,
  playerNumber: null,
  age: null,
  club: null,
  clubLogo: null,
  league: null,
  team: null,
  agegroup: null,
  gender: null,
  coach: null,
  bio: null,
  playerCardUrl: null,
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
  datetime: string | null | undefined;
  location: string | null | undefined;
  weather: string | null | undefined;
  homeclub: string | null | undefined;
  homeclublogo: string | null | undefined;
  homescore: number | null | undefined;
  awayclub: string | null | undefined;
  awayclublogo: string | null | undefined;
  awayscore: number | null | undefined;
}

export const emptyLatestMatchData: ILatestMatchData = {
  datetime: null,
  location: null,
  weather: null,
  homeclub: null,
  homeclublogo: null,
  homescore: null,
  awayclub: null,
  awayclublogo: null,
  awayscore: null,
};

export interface IActionReel {
  videoSrc: string | null;
  thumbnail: string | null;
  title: string | null;
  description: string | null;
}

export const emptyActionReel: IActionReel = {
  videoSrc: null,
  thumbnail: null,
  title: null,
  description: null,
};

export interface ITeammate {
  id: number | null;
  name: string | null;
  avatar: string | null;
  playerNumber: number | null;
}

export const emptyTeammate: ITeammate = {
  id: null,
  name: null,
  avatar: null,
  playerNumber: null,
};

export interface IVideo {
  title: string | null;
  url: string | null;
  thumbnail: string | null;
  description: string | null;
}

export const emptyVideoData: IVideo = {
  title: null,
  url: null,
  thumbnail: null,
  description: null,
};

export interface IMatchData {
  team1Badge: string | null;
  team2Badge: string | null;
  team1Name: string | null;
  team2Name: string | null;
  team1Score: number | null;
  team2Score: number | null;
  date: string | null;
  location: string | null;
  weather: string | null;
  fullRecapVideo: IVideo;
  videos: IVideo[];
}

export const emptyMatchData: IMatchData = {
  team1Badge: null,
  team2Badge: null,
  team1Name: null,
  team2Name: null,
  team1Score: null,
  team2Score: null,
  date: null,
  location: null,
  weather: null,
  fullRecapVideo: emptyVideoData,
  videos: [emptyVideoData],
};
