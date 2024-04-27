import { type FetchUserAttributesOutput } from 'aws-amplify/auth';

export default async function handlePostSignIn(
  userAttributes: FetchUserAttributesOutput,
) {
  const baseURL =
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

  const postHelper = async (
    email: string | undefined,
    name: string | undefined,
    amplify_id: string | undefined,
  ) => {
    const response = await fetch(
      `${baseURL}/addUser?email=${email}&name=${name}&amplify_id=${amplify_id}`,
    );
    const data = await response.json();
    return data;
  };

  const generateAmplifyId = (providerName: string, id: string) => {
    return providerName.toLowerCase() + '_' + id;
  };

  let amplify_id = '';
  if (userAttributes.identities) {
    const socialIdentity = JSON.parse(userAttributes.identities);
    amplify_id = generateAmplifyId(
      socialIdentity[0].providerName,
      socialIdentity[0].userId,
    );
  } else {
    amplify_id = userAttributes.sub || '';
  }

  try {
    await postHelper(userAttributes.email, userAttributes.name, amplify_id);
  } catch (error) {
    console.error(error);
  }
}
