import { atom } from 'jotai';
import { IHighlight, IMatchDataExtended } from '@/types/Dashboard.type';

export const selectedHighlightAtom = atom<IHighlight | null>(null);
export const selectedMatchAtom = atom<IMatchDataExtended | null>(null);
export const showRecapAtom = atom<boolean>(false);
