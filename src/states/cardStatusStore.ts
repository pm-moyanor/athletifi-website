import { atom } from 'jotai';
import { guestCardsDataAtom } from './profileCardsDataStore';
//TODO: change name of file to match the post method this will do. this is going to take the parameters needed to do the post, to revoke and to invite

export const guestCardActionAtom = atom(async (get) => {
  const guestCardsData = get(guestCardsDataAtom);
  return guestCardsData;
});
