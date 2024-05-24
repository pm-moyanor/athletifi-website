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

const card_url = '/assets/img/png/anderson-card-img.png';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const profileProps: IProfileProps = {
  name: 'Salvador Carillo',
  number: '#22',
  club: 'villanova soccer',
  team: 'team 2009',
  card_url: card_url,
};

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

const CardThumbnail: React.FC<IProfileProps> = ({
  name,
  number,
  club,
  team,
  card_url,
}) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<{ name: string; email: string }>(
    {
      name: '',
      email: '',
    },
  );
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

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
      console.log(invitation);
      setEmailSubmitted(true);
    } else {
      console.log('invalid email');
    }
  };

  // const toggleEmailInput = () => {
  //   setIsToggle(!isToggle);
  //   if (emailSubmitted) {
  //     setEmailSubmitted(false);
  //     setInvitation({ name: '', email: '' });
  //   }
  // };

  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => setIsToggle(false));
  return (
    <div
      ref={cardRef}
      className="flex flex-col bg-cardsBackground min-w-[250px] w-full max-w-[280px] md:w-[350px] lg:w-[320px] min-h-[200px] rounded-lg justify-between p-0 mx-2 my-6 shadow-lg"
    >
      <div className="flex flex-col-reverse md:flex-row  justify-between min-h-[160px] mx-4 md:mx-0">
        <div className="flex flex-col justify-start ml-[4px] md:ml-3 w-full md:w-1/2 mr-auto  mb-2 mt-4 md:mt-8">
          <h2
            className={`${sourceSans3.className}  mb-2 font-bold text-[20px] text-primary relative mr-auto`}
          >
            {name}
          </h2>
          <p
            className={`${sourceSans3.className}  text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative w-[170px]`}
          >
            {club}
          </p>
          <p
            className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative`}
          >
            {team}
          </p>
          <p
            className={`${sourceSans3.className} text-sm md:text-base leading-5 text-start text-primary opacity-80 lg:max-w-769 relative `}
          >
            {number}
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
        {/* <button
          className={` text-primary ${sourceSans3.className} text-sm px-2 w-full rounded-b-10  bg-buttonCardBg `}
        >
          go to dashboard
        </button> */}
        {/* <button
          onClick={toggleEmailInput}
          className={`text-primary ${sourceSans3.className} text-sm px-2 w-1/2 `}
        >
          share access to card
        </button> */}
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
            className="w-full"
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
              className="py-6 px-2"
            >
              <p className="px-3 text-sm mb-6 text-start text-primary lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                {emailSubmitted
                  ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                  : 'Invite someone to view this player card by providing their information below.'}
              </p>
              {!emailSubmitted && (
                <form
                  className="w-full flex flex-col px-3 gap-3 items-end"
                  onSubmit={emailSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    value={invitation.name}
                    placeholder="Type guest name here"
                    className=" bg-opacity-20 h-8 text-sm bottom-0 left-0 w-full p-3 border rounded text-partnersBorders"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={invitation.email}
                    placeholder="Type email here"
                    className="h-8 text-sm bottom-0 left-0 w-full p-3 border rounded text-partnersBorders"
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-darkerSkyBlue rounded"
                  >
                    Send invitation
                    {/* <FontAwesomeIcon icon={faArrowRight} /> */}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RenderCardThumbnail = () => <CardThumbnail {...profileProps} />;

export default RenderCardThumbnail;

// export default CardThumbnail;
