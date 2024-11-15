import 'server-only';

import {
  AuthData,
  NotificationPreferences,
  NotificationTypes,
  UserData,
} from '@/types/User';
import { emptyActionReel, emptyLatestMatchData, emptyNotifications } from '@/types/constants';

import { DashboardData } from '@/types/Dashboard';
import {
  filterRatingData,
  transformRatingData,
} from '@/app/utils/dashboardHelper';
import { transformMatchesToActionReels } from '@/app/utils/transformMatchesToActionReels';

import { getUserData as getUserData2 } from '@/app/actions/userData';

const dashboardDataUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboardData`;

export async function getUserData(x: AuthData): Promise<UserData | null> {
  return getUserData2(x);
}

export async function getDashboardData(cardId: string) {
  try {
    const fetchUrl = `${dashboardDataUrl}?dashboardSlug=${cardId}`;
    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
      } as HeadersInit,
      next: {
        tags: ['dashboardData'],
      },
      cache: 'force-cache',
    });

    const responseJson = await response.json();
    if (responseJson.message !== 'Success') {
      return null;
    }

    const data = responseJson.result;

    const dataObject: DashboardData = {
      latestMatch: (() => {
        if (!data.past_matches || data.past_matches.length === 0) {
          return emptyLatestMatchData;
        }
        const today = new Date();
        for (const match of data.past_matches) {
          const matchDate = new Date(match.datetime);
          if (matchDate < today) {
            return match;
          }
        }
        return emptyLatestMatchData;
      })(),
      latestPlayerRating: data.player_ratings
        ? transformRatingData(data.player_ratings[0], data.is_goalkeeper)
        : null,
      playerRatings: data.player_ratings
        ? filterRatingData(data.player_ratings, data.is_goalkeeper)
        : null,
      matchesList: data.past_matches,
      playerProfile: {
        name: data.name,
        number: data.number,
        age: data.age,
        club: data.club,
        club_logo: data.club_logo,
        league: data.league,
        team: data.team,
        age_group: data.age_group,
        gender: data.gender,
        coach: data.coach,
        bio: data.bio,
        card_url: data.card_url,
      },
      teammates: data.teammates,
      isGoalkeeper: data.is_goalkeeper,
      seasonHighlights: data.season_highlights,
      topActionReels: data.past_matches
        ? transformMatchesToActionReels(data.past_matches)
        : [emptyActionReel],
    };

    return dataObject;
  } catch (error) {
    console.error('getUserData error: %s', error);
    return null;
  }
}
