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
  number?: string | null;
  age?: number | null;
  club?: string | null;
  club_logo?: string | null;
  league?: string | null;
  team?: string | null;
  age_group?: string | null;
  gender?: string | null;
  coach?: string | null;
  bio?: string | null;
  card_url?: string | null;
}

export const emptyProfileProps: IProfileProps = {
  name: null,
  number: null,
  age: null,
  club: null,
  club_logo: null,
  league: null,
  team: null,
  age_group: null,
  gender: null,
  coach: null,
  bio: null,
  card_url: null,
};

export interface IRating {
  attribute?: string;
  rating?: number;
}

export interface IRatingProps {
  overall_rating: number | null;
  player_ratings?: IRating[];
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

export interface IMatchData {
  match_id: string | null;
  datetime: string | null;
  location: string | null;
  home_club?: string | null;
  home_club_logo?: string | null;
  home_score?: number | null;
  away_club?: string | null;
  away_club_logo?: string | null;
  away_score?: number | null;
}

export interface IMatchDataWithWeather extends IMatchData {
  weather: {
    current: {
      temp: number | null;
    };
  };
}

export interface ILatestMatchProps extends IMatchData {
  weather: number | null;
}

export const emptyLatestMatchData: IMatchDataWithWeather = {
  match_id: '',
  datetime: null,
  location: null,
  weather: { current: { temp: null } },
  home_club: null,
  home_club_logo: null,
  home_score: null,
  away_club: null,
  away_club_logo: null,
  away_score: null,
};

export interface IActionReel {
  video_src: string | null;
  thumbnail: string | null;
  title: string | null;
  description: string | null;
}

export const emptyActionReel: IActionReel = {
  video_src: null,
  thumbnail: null,
  title: null,
  description: null,
};

export interface ITeammate {
  name: string | null;
  number: number | null;
  avatar_url: string | null;
}

export const emptyTeammate: ITeammate = {
  name: null,
  number: null,
  avatar_url: null,
};

export interface ITeammates {
  teammates: ITeammate[] | undefined;
}

export interface IPastMatches {
  past_matches: IMatchDataExtended[] | undefined;
}

export interface IPastMatchesLayoutProps {
  teammates: ITeammate[] | undefined;
  past_matches: IMatchDataExtended[] | undefined;
}

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

export interface IMatchDataExtended extends IMatchDataWithWeather {
  home_club_logo: string | null;
  away_club_logo: string | null;
  home_club: string | null;
  away_club: string | null;
  home_score: number | null;
  away_score: number | null;
  video_url: string | null;
  highlight_urls: string[] | null;
  highlight_descriptions: string[] | null;
}

export const emptyMatchData: IMatchDataExtended = {
  match_id: '',
  home_club_logo: null,
  away_club_logo: null,
  home_club: null,
  away_club: null,
  home_score: null,
  away_score: null,
  datetime: null,
  location: null,
  weather: { current: { temp: null } },
  video_url: null,
  highlight_urls: null,
  highlight_descriptions: null,
};

export interface ILatestPlayerRatings {
  name: string | null;
  skill: number | null;
  attacking: number | null;
  physical: number | null;
  mentality: number | null;
  defending: number | null;
}

export const emptyLatestPlayerRatings: ILatestPlayerRatings = {
  name: '',
  skill: null,
  attacking: null,
  physical: null,
  mentality: null,
  defending: null,
};

export interface DashboardData {
  latestMatch: IMatchDataWithWeather; // replace 'any' with the type of your data
  latestPlayerRating: IRating[];
  overallRating: number;
  matchesList: IMatchDataExtended[]; // replace 'any' with the type of your data
  playerProfile: IProfileProps; // replace 'any' with the type of your data
  teammates: ITeammate[]; // replace 'any' with the type of your data
}

export const emptyDashboardData: DashboardData = {
  latestMatch: emptyLatestMatchData, // replace 'any' with the type of your data
  latestPlayerRating: [],
  overallRating: 0,
  matchesList: [emptyMatchData], // replace 'any' with the type of your data
  playerProfile: emptyProfileProps, // replace 'any' with the type of your data
  teammates: [emptyTeammate], // replace 'any' with the type of your data
};
