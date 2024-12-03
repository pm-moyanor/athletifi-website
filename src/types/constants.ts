import { ICards, NotificationPreferences } from '@/types/User';
import { IActionReel, IMatchDataWithWeather } from './Dashboard';

export const emptyNotifications: NotificationPreferences = {
  referral_notifications: false,
  athletifi_updates: false,
  general_highlights: false,
  my_player_updates: false,
};

export const emptyOwnedCard: ICards = {
  card_id: null,
  card_image_url: null,
  dashboard_slug: null,
  name: null,
  number: null,
  team: null,
  club: null,
  club_logo: null,
};

export const emptyGuestCard: ICards = {
  invite_id: null,
  status: null,
  card_id: null,
  card_image_url: null,
  dashboard_slug: null,
  inviter_email: null,
  name: null,
  number: null,
  team: null,
  club: null,
  club_logo: null,
};

export const emptyActionReel: IActionReel = {
  playback_id: null,
  title: null,
  description: null,
  home_club_logo: null,
  away_club_logo: null,
};

export const emptyLatestMatchData: IMatchDataWithWeather = {
  match_id: '',
  datetime: null,
  location: null,
  weather: { tempFahr: null, tempCelc: null },
  home_club: null,
  home_club_logo: null,
  home_score: null,
  away_club: null,
  away_club_logo: null,
  away_score: null,
};

export enum DeleteStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  REJECTED = 'rejected',
}

export enum ViewDeleteRequestState {
  INIT = 'init',
  CHECK = 'check',
  CONFIRMED = 'confirmed',
}

export enum UpdatePwErrors {
  INVALIDPW = 'InvalidPasswordException',
  NOTAUTHORIZED = 'NotAuthorizedException',
  LIMITEXCEEDED = 'LimitExceededException',
  EMPTYPW = 'EmptyUpdatePassword',
}
