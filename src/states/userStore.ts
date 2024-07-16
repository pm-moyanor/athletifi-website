import { atomWithStorage } from 'jotai/utils';
import { atom, WritableAtom, PrimitiveAtom } from 'jotai';

// Define a function to check if the code is running in a browser environment
const isBrowser = () => typeof window !== 'undefined';

// Custom storage object with expiration
const createStorageWithExpiration = (storage: Storage, expiration: number) => ({
  getItem: (key: string) => {
    if (!isBrowser()) return null; // Ensure storage is accessed only on the client side
    const item = storage.getItem(key);
    if (item) {
      const { value, expiration: itemExpiration } = JSON.parse(item);
      if (itemExpiration && itemExpiration < Date.now()) {
        storage.removeItem(key);
        return null;
      }
      return value;
    }
    return null;
  },
  setItem: (key: string, value: string | null) => {
    if (!isBrowser()) return; // Ensure storage is accessed only on the client side
    const item = {
      value,
      expiration: expiration ? Date.now() + expiration : null,
    };
    storage.setItem(key, JSON.stringify(item));
  },
  removeItem: (key: string) => {
    if (!isBrowser()) return; // Ensure storage is accessed only on the client side
    storage.removeItem(key);
  },
});

//TODO: replace the any type with the actual type of the response from the postHelper function
// Define `inviteIdAtom` differently based on environment

export let inviteIdAtom:
  | WritableAtom<string | null, [string | null], void>
  | PrimitiveAtom<string | null>;

if (isBrowser()) {
  const expirationInMs = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
  const storage = createStorageWithExpiration(localStorage, expirationInMs);

  // atomWithStorage accepts a storage interface and utilizes a tuple for updates
  inviteIdAtom = atomWithStorage<string | null>('inviteId', null, storage);
} else {
  // Simple atom that only stores a value without complex updates.
  inviteIdAtom = atom<string | null>(null);
}
