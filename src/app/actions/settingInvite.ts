'use server';

//TODO: test invitation function
import axiosClient from '@/utils/axiosClient';

export async function testInvitation(
  cardID: string | null,
  formData: FormData,
) {
  try {
    const email = formData.get('email') as string;
    const body = {
      action: 'invite',
      guest_email: email,
      card_image_id: cardID,
    };
    const response = await axiosClient.post('/referralInvite', body);
    const data = await response.data;
    console.log('data', data);
    if (response.status === 200) {
      return data;
    } else {
      return {
        error: data.error || 'An error occurred during the invitation process.',
      };
    }
  } catch (error) {
    console.error('Failed to send invitation', error);
    return { error: 'Failed to send invitation' };
  }
}
