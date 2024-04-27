import {
  fetchUserAttributes,
  type FetchUserAttributesOutput,
} from 'aws-amplify/auth';

export default async function handleFetchUserAttributes(): Promise<FetchUserAttributesOutput> {
  return await fetchUserAttributes();
}
