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
  id: string | null | undefined;
  datetime: string | null | undefined;
  location: string | null | undefined;
  home_club?: string | null | undefined;
  home_club_logo?: string | null | undefined;
  home_score?: number | null | undefined;
  away_club?: string | null | undefined;
  away_club_logo?: string | null | undefined;
  away_score?: number | null | undefined;
}

export interface IMatchDataWithWeather extends IMatchData {
  weather: {
    current: {
      temp: number | null;
    };
  };
}

export interface ILatestMatchProps extends IMatchData {
  weather: number | null | undefined;
}

export const emptyLatestMatchData: IMatchDataWithWeather = {
  id: '',
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
  team1_badge: string | null;
  team2_badge: string | null;
  team1_name: string | null;
  team2_name: string | null;
  team1_score: number | null;
  team2_score: number | null;
  full_recap_video: IVideo;
  videos: IVideo[];
}

export const emptyMatchData: IMatchDataExtended = {
  id: '',
  team1_badge: null,
  team2_badge: null,
  team1_name: null,
  team2_name: null,
  team1_score: null,
  team2_score: null,
  datetime: null,
  location: null,
  weather: { current: { temp: null } },
  full_recap_video: emptyVideoData,
  videos: [emptyVideoData],
};

export interface ILatestPlayerRatings {
  skill_ratings: number | null;
  attacking_ratings: number | null;
  physical_ratings: number | null;
  mentality_ratings: number | null;
  defending_ratings: number | null;
}
