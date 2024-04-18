// import { atom, useAtom } from 'jotai';
// import { useEffect } from 'react';
// import { notFound, useParams } from 'next/navigation';
// import { DashboardData } from '@/types/Dashboard.type';
// import {
//   filterRatingData,
//   transformRatingData,
// } from '@/app/utils/dashboardHelper';

// export interface DashboardState {
//   data: DashboardData | null;
//   fetchStatus: 'idle' | 'loading' | 'success' | 'error';
//   errorMessage: string | null;
// }

// export const dashboardDataAtom = atom({
//   data: null as DashboardData | null,
//   fetchStatus: 'idle',
//   errorMessage: null,
// });

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';
// const fetchHelper = async (cardId: string) => {
//   const response = await fetch(`${baseURL}/dashboard/${cardId}`);
//   const data = await response.json();
//   if (!cardId || !data) {
//     return notFound();
//   }
//   return data;
// };

// export function useDashboardData() {
//   const [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);
//   const [isFetchMessage, setFetchMessage] = useAtom<string | null>(
//     atom<string | null>(null),
//   );
//   const { cardId } = useParams();
//   const cardIdValue = Array.isArray(cardId) ? cardId.join('/') : cardId;

//   useEffect(() => {
//     setDashboardData({ ...dashboardData, fetchStatus: 'loading' });
//     fetchHelper(cardIdValue as string)
//       .then((data) => {
//         if (data) {
//           const dataObject: DashboardData = {
//             latestMatch: data.result.past_matches
//               ? data.result.past_matches[0]
//               : null,
//             latestPlayerRating: data.result.player_ratings
//               ? transformRatingData(
//                   data.result.player_ratings[0],
//                   data.result.is_goalkeeper,
//                 )
//               : null,
//             playerRatings: data.result.player_ratings
//               ? filterRatingData(
//                   data.result.player_ratings,
//                   data.result.is_goalkeeper,
//                 )
//               : null,
//             matchesList: data.result.past_matches,
//             playerProfile: data.result,
//             teammates: data.result.teammates,
//             isGoalkeeper: data.result.is_goalkeeper,
//             seasonHighlights: data.result.season_highlights,
//           };
//           setDashboardData({
//             data: dataObject,
//             fetchStatus: 'success',
//             errorMessage: null,
//           });
//         } else {
//           console.log('i am here after the else');
//           console.error('Dashboard data was unsuccessfully fetched:', data);
//           setFetchMessage(data.message);
//         }
//       })
//       .catch((error) => {
//         console.log('i am here after the catch');
//         console.error('Failed to fetch data:', error);
//         setFetchMessage('Data load error. Please try again.');
//       });
//   }, [cardIdValue]);
//   console.log(dashboardData);

//   return { dashboardData, isFetchMessage };
// }
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { DashboardData } from '@/types/Dashboard.type';
import {
  filterRatingData,
  transformRatingData,
} from '@/app/utils/dashboardHelper';
import { notFound } from 'next/navigation';

export interface DashboardState {
  latestMatch: any;
  data: DashboardData | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

export const dashboardDataAtom = atom<DashboardState>({
  data: null,
  fetchStatus: 'idle',
  errorMessage: null,
});

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

async function fetchDashboardData(
  cardId: string,
  set: (value: DashboardState) => void,
) {
  set({
    data: null,
    fetchStatus: 'loading',
    errorMessage: null,
  });

  try {
    const response = await fetch(`${baseURL}/dashboard/${cardId}`);
    if (!response.ok) {
      return notFound;
    }
    const data = await response.json();
    // console.log('Fetched data:', data, 'for cardId:', cardId);
    const dataObject: DashboardData = {
      latestMatch: data.result.past_matches
        ? data.result.past_matches[0]
        : null,
      latestPlayerRating: data.result.player_ratings
        ? transformRatingData(
            data.result.player_ratings[0],
            data.result.is_goalkeeper,
          )
        : null,
      playerRatings: data.result.player_ratings
        ? filterRatingData(
            data.result.player_ratings,
            data.result.is_goalkeeper,
          )
        : null,
      matchesList: data.result.past_matches,
      playerProfile: data.result,
      teammates: data.result.teammates,
      isGoalkeeper: data.result.is_goalkeeper,
      seasonHighlights: data.result.season_highlights,
    };

    set({
      data: dataObject,
      fetchStatus: 'success',
      errorMessage: null,
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    set({
      data: null,
      fetchStatus: 'error',
      errorMessage: 'Data load error. Please try again.',
    });
  }
}

export function useDashboardData(cardId: string) {
  const [dashboardData, setDashboardData] = useAtom(dashboardDataAtom);

  useEffect(() => {
    if (cardId) {
      fetchDashboardData(cardId, setDashboardData);
    }
  }, [cardId]);

  return { dashboardData };
}
