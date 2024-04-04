'use client';
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react';
import Card from './../../../public/assets/img/png/jose-card-img.png';
import Image from 'next/image';
import { IProfileProps } from '@/types/Dashboard.type';
import { Source_Sans_3 } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});

const profileProps: IProfileProps = {
  name: 'Salvador Carillo',
  number: '#22',
  club: 'villanova soccer',
  team: 'team 2009',
  card_url: Card,
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
  const [email, setEmail] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const emailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log(email);
      setEmailSubmitted(true);
    } else {
      console.log('invalid email');
    }
  };

  const toggleEmailInput = () => {
    setIsToggle(!isToggle);
  };
  const cardRef = useRef<HTMLDivElement>(null);
  useOutsideClick(cardRef, () => setIsToggle(false));
  return (
    <div
      ref={cardRef}
      className="flex flex-col bg-cardsBackground w-[350px] lg:w-[320px] min-h-[190px] rounded-lg justify-between p-0 mx-2 my-6 shadow-md"
    >
      <div className="flex justify-between min-h-[160px]">
        <div className="flex flex-col justify-start ml-3 w-1/2 mr-auto mt-8">
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

        <div className="-mt-6 mr-2 w-1/2 h-36 relative">
          <Image
            src={card_url}
            alt="Card Thumbnail"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <div className="w-full flex justify-center  border-t border-card_border h-12 ">
        <button
          className={` text-primary ${sourceSans3.className} text-sm  w-1/2 rounded-bl-10  bg-buttonCardBg `}
        >
          go to dashboard
        </button>
        <button
          onClick={toggleEmailInput}
          className={`text-primary ${sourceSans3.className} text-sm  w-1/2 `}
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
            className="w-full"
          >
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              className="py-6"
            >
              <p className="px-3 text-sm mb-2 text-start text-primary lg:max-w-769 relative min-w-[256px]">
                {emailSubmitted
                  ? 'Invitation sent! Your card is now accessible to your guest'
                  : 'Enter the email of the recipient to share access to your card'}
              </p>
              {!emailSubmitted && (
                <form
                  className="w-full flex h-[40px] px-3"
                  onSubmit={emailSubmit}
                >
                  <input
                    type="email"
                    value={email}
                    placeholder="Type email here"
                    className=" text-sm bottom-0 left-0 w-full p-3 border rounded-l text-partnersBorders"
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="w-1/6 p-3  font-semibold text-sm md:text-base leading-6 flex items-center justify-center bg-darkerSkyBlue rounded-r"
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
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
