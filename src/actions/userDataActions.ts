'use server';

import {
  NotificationPreferences,
  NotificationTypes,
  UserData,
  emptyNotifications,
} from '@/types/User.type';
import { revalidateTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { isAuthenticated } from '@/utils/auth/amplify-utils';

const userDataUrl = `${process.env.NEXT_BACKEND_API_URL}/userData`;

function transformNotificationPreferences(dataArray: NotificationTypes[]) {
  const tmp = { ...emptyNotifications };
  dataArray.map((item: keyof NotificationPreferences) => {
    tmp[item] = true;
  });
  return tmp;
}

export async function getUserData() {
  try {
    const { userId, name, email } = await isAuthenticated();
    if (!userId) redirect('/login');

    const fetchUrl = `${userDataUrl}?amplify_id=${userId}`;
    const response = await fetch(fetchUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
      },
      next: {
        tags: ['userData'],
      },
    });

    const responseJson = await response.json();
    if (responseJson.message !== 'Success') {
      notFound();
    }

    const userData = responseJson.result;
    console.log(userData);

    const dataObject: UserData = {
      amplify_id: userId,
      name: name as string,
      email: email as string,
      init_notifications: userData.init_notifications,
      notifications:
        userData.notifications_enabled.length > 0
          ? transformNotificationPreferences(userData.notifications_enabled)
          : emptyNotifications,
      user_delete_status: userData.delete_status,
      owned_cards: userData.owned_cards,
      guest_cards: userData.guest_cards,
      invites: userData.invites,
    };

    return dataObject;
  } catch (error) {
    console.error('Data fetch error %s', error);
    return null;
  }
}

async function enableNotificationHelper(
  amplifyId: string,
  notificationType: string,
) {
  const response = await fetch(`${userDataUrl}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    },
    body: JSON.stringify({
      amplify_id: amplifyId,
      notification_type: notificationType,
    }),
  });
  const data = await response.json();
  return data;
}

async function disableNotificationHelper(
  amplifyId: string,
  notificationType: string,
) {
  const deleteUrl = `${userDataUrl}?amplify_id=${amplifyId}&notification_types=${notificationType}`;
  const response = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    },
  });
  const data = await response.json();
  return data;
}

export async function addNotification(
  amplifyId: string,
  notificationType: string,
) {
  // User Authentication check required
  //   const userId = auth().userId;
  //   if (userId === null) redirect('/login');

  try {
    await enableNotificationHelper(amplifyId, notificationType);
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidateTag('userData');
  return true;
}

export async function deleteNotification(
  amplifyId: string,
  notificationType: string,
) {
  // User Authentication check required
  //   const userId = auth().userId;
  //   if (userId === null) redirect('/login');

  const notification_types =
    notificationType === 'All'
      ? JSON.stringify(Object.keys(emptyNotifications))
          ?.toString()
          .replace(/[\[]/g, '(')
          .replace(/[\]]/g, ')')
          .replace(/"/g, `'`)
      : `('${notificationType}')`;
  try {
    await disableNotificationHelper(amplifyId, notification_types);
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidateTag('userData');
  return true;
}
