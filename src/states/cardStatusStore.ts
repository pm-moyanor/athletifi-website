import { atom } from 'jotai';
import { guestCardsDataAtom } from './profileCardsDataStore';

export const guestCardActionAtom = atom(async (get) => {
  const guestCardsData = get(guestCardsDataAtom);
  return guestCardsData;
});
