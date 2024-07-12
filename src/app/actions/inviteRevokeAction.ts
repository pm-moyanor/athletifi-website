'use server';

import axiosClient from '@/utils/axiosClient';
import { revalidatePath } from 'next/cache';

export async function inviteRevokeAction(
  inviteId: string | null,
  card_name: string | null | undefined,
) {
  try {
    const body = {
      action: 'revoke',
      inviteId: inviteId,
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
        error: data.error || 'An error occurred during the revoke process.',
      };
    }
  } catch (error) {
    console.error('Failed to revoke invitation', error);
    return { error: 'Failed to revoke invitation' };
  }
}
