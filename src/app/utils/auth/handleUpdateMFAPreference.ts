import { updateMFAPreference } from 'aws-amplify/auth';

export default async function handleUpdateMFAPreference() {
  try {
    await updateMFAPreference({ totp: 'PREFERRED' });
  } catch (error) {
    console.log(error);
  }
}
