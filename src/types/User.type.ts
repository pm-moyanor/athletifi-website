export enum NotificationTypes {
  REFERRAL = 'referral_notifications',
  ATHLETIFI = 'athletifi_updates',
  GENERAL = 'general_highlights',
  PLAYER = 'my_player_updates',
}

export const NotificationTitles = [
  { name: 'Referral Notifications', value: 'referral_notifications' },
  { name: 'AthletiFi Updates', value: 'athletifi_updates' },
  { name: 'General Highlights', value: 'general_highlights' },
  { name: 'My Player Updates', value: 'my_player_updates' },
];

export type NotificationPreferences = {
  referral_notifications: boolean;
  athletifi_updates: boolean;
  general_highlights: boolean;
  my_player_updates: boolean;
};

export const emptyNotifications: NotificationPreferences = {
  referral_notifications: false,
  athletifi_updates: false,
  general_highlights: false,
  my_player_updates: false,
};

export type LatestChange = {
  notification_types: string[] | null;
  value: boolean | null;
};

export const emptyLatestChange: LatestChange = {
  notification_types: null,
  value: null,
};

export type UserData = {
  amplify_id: string | null;
  notifications: NotificationPreferences | null;
};
