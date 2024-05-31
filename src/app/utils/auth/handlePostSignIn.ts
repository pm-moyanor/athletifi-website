import { type FetchUserAttributesOutput } from 'aws-amplify/auth';

export default async function handlePostSignIn(
  userAttributes: FetchUserAttributesOutput,
  inviteId: string | null,
) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const postHelper = async (
    email: string | undefined,
    name: string | undefined,
    amplify_id: string | undefined,
  ) => {
    console.log('inviteId inside postHelper in handlePostSignIn:');
    console.log(inviteId);
    const response = await fetch(`${baseURL}/addUser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        amplify_id: amplify_id,
        email: email,
        name: name,
        invite_id: inviteId,
      }),
    });

    const data = await response.json();
    console.log('data from lambda', data);
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
    const data = await postHelper(
      userAttributes.email,
      userAttributes.name,
      amplify_id,
    );
    console.log('data from lambda', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
