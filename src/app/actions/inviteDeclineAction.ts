'use server';

import axiosClient from '@/utils/axiosClient';
import { revalidatePath } from 'next/cache';

export async function inviteDeclineAction(
  inviteId: string | null,
  owner_email: string | null | undefined,
  card_name: string | null | undefined,
) {
  try {
    const body = {
      action: 'decline',
      inviteId: inviteId,
      owner_email: owner_email,
      card_name: card_name,
    };
    const response = await axiosClient.post('/referralInvite', body);
    const data = await response.data;
    console.log('data', data);
    if (response.status === 200) {
      revalidatePath('/referralInvite');
      return data;
    } else {
      return {
        error: data.error || 'An error occurred during the decline process.',
      };
    }
  } catch (error) {
    console.error('Failed to decline invitation', error);
    return { error: 'Failed to decline invitation' };
  }
}
