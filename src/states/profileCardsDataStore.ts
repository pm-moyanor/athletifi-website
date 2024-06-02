import { atom } from 'jotai';
import { userDataAtom } from '@/states/userStore';

// Base URL for API calls
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Parameterized atom to fetch dashboard data
// This atom takes a slug as a parameter and returns an atom
// The atom's read function fetches the dashboard data for the given slug from the API
export const dashboardDataAtom = (slug: string) =>
  atom(async () => {
    // Fetch the dashboard data from the API
    const response = await fetch(`${baseURL}/dashboard/${slug}`);
    // Parse the response as JSON
    const data = await response.json();
    // Return the data
    return data;
  });

// Atom to fetch owned cards data
// This atom's read function fetches the data for all the dashboards owned by the user
export const ownedCardsDataAtom = atom(async (get) => {
  // Get the user's data
  const userData = get(userDataAtom);
  // Get the slugs of the owned dashboards
  const ownedCardSlugs = Array.isArray(userData?.data?.owned_cards)
    ? userData?.data?.owned_cards.map((card) => card.dashboard_slug)
    : [];
  // Fetch the data for each owned dashboard
  return await Promise.all(
    ownedCardSlugs.map((slug) => get(dashboardDataAtom(slug))),
  );
});

// Atom to fetch guest cards data
// This atom's read function fetches the data for all the dashboards where the user is a guest
export const guestCardsDataAtom = atom(async (get) => {
  // Get the user's data
  const userData = get(userDataAtom);
  // Get the slugs of the guest dashboards
  const guestCardSlugs = Array.isArray(userData?.data?.guest_cards)
    ? userData?.data?.guest_cards.map((card) => card.dashboard_slug)
    : [];
  // Fetch the data for each guest dashboard
  return await Promise.all(
    guestCardSlugs.map((slug) => get(dashboardDataAtom(slug))),
  );
});
