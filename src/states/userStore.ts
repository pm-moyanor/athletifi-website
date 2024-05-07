import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useState, useEffect } from 'react';
import { UserData, allNotificationsEnabled } from '@/types/User.type';
import {
  NotificationTypes,
  NotificationPreferences,
  emptyNotifications,
  LatestChange,
  emptyLatestChange,
} from '@/types/User.type';
import { getCurrentUser } from 'aws-amplify/auth';
import handleFetchUserAttributes from '@/app/utils/auth/handleFetchUserAttributes';
import handlePostSignIn from '@/app/utils/auth/handlePostSignIn';

export interface UserState {
  data: UserData | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

// Define the state shape for the user
export const userDataAtom = atom<UserState>({
  data: null,
  fetchStatus: 'idle',
  errorMessage: null,
});

// Now using persistence via atomWithStorage for invite_id:
// export const inviteIdAtom = atom<string | null>(null);
export const inviteIdAtom = atomWithStorage<string | null>('inviteId', null);

function transformNotificationPreferences(dataArray: NotificationTypes[]) {
  const tmp = { ...emptyNotifications };
  dataArray.map((item: keyof NotificationPreferences) => {
    tmp[item] = true;
  });
  return tmp;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

// Function to fetch user data from the API
async function fetchUserData(
  currState: UserState,
  set: (value: UserState) => void,
  inviteId: string | null,
) {
  let amplify_id, userAttributes, auth_method;
  if (currState.data) {
    // Use existing authenticated user details
    amplify_id = currState.data.amplify_id;
    auth_method = currState.data.auth_method;
    userAttributes = {
      name: currState.data.name,
      email: currState.data.email,
      email_verified: currState.data.email_verified,
    };
  } else {
    // Get authenticated user
    try {
      const user = await getCurrentUser();
      amplify_id = user.username;

      if (
        amplify_id.split('_').length > 1 &&
        (amplify_id.split('_')[0] === 'google' ||
          amplify_id.split('_')[0] === 'facebook')
      ) {
        auth_method = amplify_id.split('_')[0];
      } else {
        auth_method = 'email';
      }

      userAttributes = await handleFetchUserAttributes();

      await handlePostSignIn(userAttributes, inviteId);
    } catch (err) {
      console.warn('User is currently not logged in. Skipping userData fetch');
      return;
    }
  }

  set({
    data: amplify_id === currState.data?.amplify_id ? currState.data : null,
    fetchStatus: 'loading',
    errorMessage: null,
  });

  try {
    const response = await fetch(`${baseURL}/user?amplify_id=${amplify_id}`);
    if (!response.ok) {
      throw new Error('Data load error. Please try again.');
    }
    const data = await response.json();

    const dataObject: UserData = {
      amplify_id: amplify_id,
      auth_method: auth_method,
      name: userAttributes.name as string,
      email: userAttributes.email as string,
      email_verified: userAttributes.email_verified as string,
      init_notifications: data.result.init_notifications,
      notifications:
        data.result.notifications_enabled.length > 0
          ? transformNotificationPreferences(data.result.notifications_enabled)
          : emptyNotifications,
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

// Custom hook to use the user data in a component
export function useUserData() {
  // Use jotai's useAtom to manage the state
  const [userData, setUserData] = useAtom(userDataAtom);
  const [latestChange, setLatestChange] =
    useState<LatestChange>(emptyLatestChange);
  const inviteId = useAtomValue(inviteIdAtom);

  // Fetch the user data whenever the amplify_id changes
  useEffect(() => {
    fetchUserData(userData, setUserData, inviteId);
  }, [inviteId, setUserData, userData]);

  useEffect(() => {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

    const postHelper = async (
      amplify_id: string,
      notification_types: string[],
    ) => {
      const response = await fetch(`${baseURL}/user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          amplify_id: amplify_id,
          notification_type: notification_types[0],
        }),
      });
      const data = await response.json();
      return data;
    };

    const deleteHelper = async (
      amplify_id: string,
      notification_types: string[],
    ) => {
      const response = await fetch(
        `${baseURL}/user?amplify_id=${amplify_id}&notification_types=${JSON.stringify(notification_types)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      const data = await response.json();
      return data;
    };

    if (userData.data?.amplify_id && latestChange.notification_types) {
      if (latestChange.value) {
        postHelper(
          userData.data?.amplify_id,
          latestChange.notification_types,
        ).then(() => {
          if ((latestChange.notification_types as string[])[0] === 'All') {
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: allNotificationsEnabled,
              },
            });
            console.log(userData);
          } else {
            // Manually construct updated userData state object after POST
            setUserData({
              ...userData,
              data: {
                ...(userData.data as UserData),
                notifications: {
                  ...(userData.data?.notifications as NotificationPreferences),
                  [(latestChange.notification_types as string[])[0]]: true,
                },
              },
            });
          }
        });
      } else {
        deleteHelper(
          userData.data?.amplify_id,
          latestChange.notification_types,
        ).then(() => {
          // Build object with update notification preferences
          const updateArray = (latestChange.notification_types as string[]).map(
            (key) => {
              return {
                [key]: false,
              };
            },
          );
          const updateObject = Object.assign({}, ...updateArray);
          // Manually construct updated userData state object after DELETE
          setUserData({
            ...userData,
            data: {
              ...(userData.data as UserData),
              notifications: {
                ...(userData.data?.notifications as NotificationPreferences),
                ...updateObject,
              },
            },
          });
        });
      }
    }
  }, [latestChange]);

  function resetUserDataState() {
    setUserData({
      data: null,
      fetchStatus: 'idle',
      errorMessage: null,
    });
  }

  // Return the current state of the user data
  return {
    userData: userData,
    setLatestChange: setLatestChange,
    resetUserDataState: resetUserDataState,
  };
}
