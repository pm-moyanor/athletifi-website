'use client';
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import Image from 'next/image';
import { IProfileProps } from '@/types/Dashboard.type';
import { Source_Sans_3 } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

const CardThumbnail: React.FC<{
  cardData: IProfileProps;
  isOwned: boolean;
}> = ({ cardData, isOwned }) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<{ name: string; email: string }>(
    {
      name: '',
      email: '',
    },
  );
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

  const { name, team, club, card_url, number, club_logo } = cardData;
  console.log(cardData);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };

  const emailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (invitation.email) {
      setEmailSubmitted(true);
      setInvitation({ name: '', email: '' }); // Reset the form after submission
    } else {
      console.log('invalid email');
    }
  };

  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => setIsToggle(false));

  return (
    <div ref={cardRef} className={`${isOwned ? 'w-full' : ''}`}>
      {isOwned ? (
        <div className="flex justify-between flex-col md:flex-row items-center w-full">
          <div className="relative w-[300px] h-[350px] md:w-[160px] md:h-[210px]">
            {card_url ? (
              <Image
                src={card_url}
                alt="Card Thumbnail"
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <Image
                src={card_url as string}
                alt="Default Card Thumbnail"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className="flex flex-col lg:flex-row gap-[12px] items-center flex-1 lg:justify-evenly">
            <h2 className="leading-8 font-bold text-[28px] md:text-[24px] text-primary text-center">
              {name}
            </h2>

            <div className="flex gap-4">
              <div className="w-16 h-18 relative">
                <Image
                  src={club_logo as string}
                  alt="club crest"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="gap-1 flex flex-col text-sm">
                <p className={`text-primary opacity-80 relative`}>{club}</p>
                <p className={`text-primary opacity-80 relative`}>{team}</p>
                <p className={`text-primary opacity-80 lg:max-w-769 relative`}>
                  #{number}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col my-8 md:mx-4 gap-2 items-center justify-center">
            <button className="text-darkgray w-[146px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out">
              go to dashboard
            </button>
            <button
              className="text-primary w-[146px] md:w-[160px] h-8 text-xs md:text-sm border border-offwhite rounded-full font-extralight bg-transparent hover:bg-skyblue hover:border-skyblue transform hover:scale-95 ease-in-out"
              onClick={() => setIsToggle(!isToggle)}
            >
              share access to card
            </button>
          </div>
          <AnimatePresence>
            {isToggle && (
              <motion.div
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { height: 'auto' },
                  collapsed: { height: 0 },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
                className="px-3 w-full self-center md:self-end max-w-[500px] md:max-w-none"
              >
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 100 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.08,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="mt-2 mb-8 flex flex-col lg:flex-row justify-end lg:items-center lg:gap-3"
                >
                  <p className="text-sm mb-2 lg:mb-0 text-offwhite relative min-w-[216px] transition-opacity duration-300 opacity-100 md:mr-4">
                    {emailSubmitted
                      ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                      : 'Invite someone to view this card'}
                  </p>
                  {!emailSubmitted && (
                    <form
                      className="w-full flex flex-col md:flex-row gap-3 justify-end"
                      onSubmit={emailSubmit}
                    >
                      <input
                        type="text"
                        name="name"
                        value={invitation.name}
                        placeholder="Type guest name here"
                        className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[360px] p-3 border border-partnersBorders rounded text-partnersBorders bg-cardsBackground"
                        onChange={handleChange}
                      />
                      <input
                        type="email"
                        name="email"
                        value={invitation.email}
                        placeholder="Type email here"
                        className="h-8 text-sm bottom-0 left-0 w-full md:max-w-[360px] p-3 border border-partnersBorders rounded text-partnersBorders bg-cardsBackground"
                        onChange={handleChange}
                      />
                      <button
                        type="submit"
                        className="text-darkgray w-[130px] md:min-w-[160px] md:w-[160px] h-8 bg-skyblue text-xs md:text-sm rounded-full hover:opacity-90 transform hover:scale-95 ease-in-out mt-2 md:mt-0"
                      >
                        Send invitation
                      </button>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col bg-cardsBackground min-w-[250px] w-full max-w-[280px] md:w-[350px] lg:w-[320px] min-h-[200px] rounded-lg justify-between p-0 my-6 shadow-lg">
          <div className="flex flex-col-reverse md:flex-row justify-between min-h-[160px] mx-4 md:mx-0">
            <div className="flex flex-col justify-start ml-[4px] md:ml-3 w-full md:w-1/2 mr-auto mb-2 mt-4 md:mt-8">
              <h2
                className={`${sourceSans3.className} mb-2 font-bold text-[20px] text-primary relative mr-auto`}
              >
                {name}
              </h2>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative w-[170px]`}
              >
                {club}
              </p>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
              >
                {team}
              </p>
              <p
                className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
              >
                #{number}
              </p>
            </div>

            <div className="-mt-0 md:-mt-6 w-full md:w-1/2 h-56 md:h-36 relative">
              {card_url ? (
                <Image
                  src={card_url}
                  alt="Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={card_url as string}
                  alt="Default Card Thumbnail"
                  layout="fill"
                  objectFit="contain"
                />
              )}
            </div>
          </div>

          <div className="w-full flex justify-end pb-4 pr-4">
            <button className="text-darkgray w-[130px] md:w-[160px] h-8 bg-skyblue text-sm rounded-full font-normal hover:opacity-90 transform hover:scale-95 ease-in-out">
              go to dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RenderCardThumbnail: React.FC<{
  cardData: IProfileProps | null | undefined;
  isOwned: boolean;
}> = ({ cardData, isOwned }) => {
  if (!cardData) {
    return (
      <div className="card-thumbnail-error">Card data is not available.</div>
    );
  }

  return <CardThumbnail cardData={cardData} isOwned={isOwned} />;
};

export default RenderCardThumbnail;
