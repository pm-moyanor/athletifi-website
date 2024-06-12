'use client';
import { OwnedCards, GuestCards } from '@/types/User.type';
import { Source_Sans_3 } from 'next/font/google';
import RenderCardThumbnail from '@/components/user-portal/CardThumbnail';
import { useAtomValue } from 'jotai';
import {
  ownedCardsDataAtom,
  guestCardsDataAtom,
} from '@/states/profileCardsDataStore';
import { IProfileProps } from '@/types/Dashboard.type';

interface ICardData {
  result: IProfileProps;
  ownedCardInfo: OwnedCards;
  guestCardInfo: GuestCards;
}

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

//const card_url = '/assets/img/png/anderson-card-img.png';

export default function ManageReferrals() {
  const ownedCardsData = useAtomValue(ownedCardsDataAtom) as ICardData[];
  const guestCardsData = useAtomValue(guestCardsDataAtom) as GuestCards[];

  console.log('guestCardsData in manageReferrals', guestCardsData);
  console.log('ownedCardsData in manageReferrals', ownedCardsData);

  const filterAcceptedGuestCards = (cards: GuestCards[]) => {
    return cards.filter((card: GuestCards) => card.status === 'accepted');
  };
  const acceptedGuestCards = filterAcceptedGuestCards(guestCardsData);

  return (
    <div
      className={`${sourceSans3.className} flex flex-col mt-16 text-primary`}
      id="manage-referrals"
    >
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Manage Referrals
      </h2>

      <div className="text-primary my-8">
        {/*=============== REFERRALS */}
        <div className="text-md font-semibold leading-5 mx-2">
          My shared cards
        </div>
        <div className="font-extralight mx-2 py-2 mb-2">
          Manage access to your guest list
        </div>
        {ownedCardsData.length > 0 ? (
          <div className="flex flex-wrap w-full gap-4">
            {ownedCardsData.map(
              (cardData: ICardData, idx: React.Key | null | undefined) => {
                if (!cardData.ownedCardInfo.card_id) {
                  return (
                    <p key={idx} className="text-primary opacity-80 p-2">
                      You currently do not own any cards. Once you have one, it
                      will be displayed here.
                    </p>
                  );
                }
                return (
                  <RenderCardThumbnail
                    key={idx}
                    // userData={cardData}
                    cardData={cardData}
                    isOwned={true}
                    inSettings={true}
                  />
                );
              },
            )}
          </div>
        ) : (
          <p className="text-primary opacity-80 p-2">
            {' '}
            You currently do not own any cards. Once you have one, it will be
            displayed here.
          </p>
        )}
        {/*=============== INVITATIONS */}
        <div className="text-md font-semibold leading-5 mx-2 mt-8">
          My Invitations
        </div>
        <div className="text-primary font-extralight mx-2 py-2 mb-2">
          View invitations to other users&apos; cards
        </div>
        {acceptedGuestCards.length > 0 ? (
          <div className="flex justify-start py-2 overflow-x-auto hide-scrollbar gap-4">
            {acceptedGuestCards.map(
              (cardData: GuestCards, idx: React.Key | null | undefined) => {
                if (!cardData) {
                  return null;
                }

                return (
                  <RenderCardThumbnail
                    key={idx}
                    cardData={cardData as unknown as ICardData}
                    isOwned={false}
                    inSettings={true}
                  />
                );
              },
            )}
          </div>
        ) : (
          <p className="text-primary opacity-80 p-2">
            No cards have been shared with you yet. Once someone shares a card
            with you, it will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
