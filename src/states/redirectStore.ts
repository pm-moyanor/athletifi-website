import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const DEFAULT_REDIRECT_ON_SIGN_IN = '/profile';

export interface RedirectState {
  redirectPath: string | null;
  fetchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

// Define the shape for the redirect state
export const redirectDataAtom = atom<RedirectState>({
  redirectPath: null,
  fetchStatus: 'idle',
  errorMessage: null,
});

// Function to fetch redirect data
export function writeRedirectData(
  redirectPath: string,
  set: (value: RedirectState) => void,
) {
  set({
    redirectPath: null,
    fetchStatus: 'loading',
    errorMessage: null,
  });

  try {
    // Update the state with the fetched data
    set({
      redirectPath: redirectPath,
      fetchStatus: 'success',
      errorMessage: null,
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    set({
      redirectPath: null,
      fetchStatus: 'error',
      errorMessage: 'Data load error. Please try again.',
    });
  }
}
// Custom hook to use the redirect data in a component
export function useRedirectData(redirectPath: string | null) {
  // Use jotai's useAtom to manage the state
  const [redirectData, setRedirectData] = useAtom(redirectDataAtom);

  // Set the redirect data whenever the redirectPath changes
  useEffect(() => {
    writeRedirectData(
      redirectPath || redirectData.redirectPath || DEFAULT_REDIRECT_ON_SIGN_IN,
      setRedirectData,
    );
  }, []);

  // Return the current redirect data
  return { redirectData, setRedirectData };
}
