'use server';

import { emptyNotifications } from '@/types/User.type';
import { revalidateTag } from 'next/cache';

const userDataUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/userData`;
const addUserUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/addUser`;
const deleteUserDataUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/purgeUserData`;

async function enableNotificationHelper(
  amplifyId: string,
  notificationType: string,
) {
  const response = await fetch(`${userDataUrl}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
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
    } as HeadersInit,
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

async function deleteUserHelper(amplify_id: string) {
  const response = await fetch(deleteUserDataUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    body: JSON.stringify({
      amplify_id: amplify_id,
    }),
  });
  const data = await response.json();
  return data;
}

export async function deleteUserRequest(amplify_id: string) {
  try {
    await deleteUserHelper(amplify_id);
  } catch (error) {
    console.error(error);
    return false;
  }

  revalidateTag('userData');
  return true;
}

async function addUserHelper(
  email: string | undefined,
  name: string | undefined,
  amplifyId: string | undefined,
  inviteId: string,
) {
  const response = await fetch(`${addUserUrl}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    body: JSON.stringify({
      amplify_id: amplifyId,
      email: email,
      name: name,
      invite_id: inviteId,
    }),
  });

  const data = await response.json();
  return data;
}

export async function addUserPostSignIn(
  inviteId: string,
  email: string,
  name: string,
  userId: string,
) {
  try {
    const data = await addUserHelper(email, name, userId, inviteId);

    revalidateTag('userData');
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
