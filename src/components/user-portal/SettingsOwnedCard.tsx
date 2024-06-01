import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardData } from '@/states/dashboardStore';
import { OwnedCards } from '@/types/User.type';

type OwnedCardProps = {
  card: OwnedCards;
  card_image_url: string | null;
  idx: number;
};

const OwnedCard = ({ card, card_image_url, idx }: OwnedCardProps) => {
  const [isToggle, setIsToggle] = useState(false);
  const [invitation, setInvitation] = useState({
    name: '',
    email: '',
  });
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [error, setError] = useState('');
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      [name]: value,
    }));
  };

  const emailSubmit = (e) => {
    e.preventDefault();
    const { name, email } = invitation;

    if (name && email) {
      console.log('Send invitation', name, email);
      setEmailSubmitted(true);
      setError('');
      //send invite??
    } else {
      setError('Please fill out both the name and email fields.');
    }
  };

  const toggleEmailInput = () => {
    setIsToggle(!isToggle);
    if (emailSubmitted) {
      setEmailSubmitted(false);
      setInvitation({ name: '', email: '' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setIsToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { dashboardData } = useDashboardData(card.dashboard_slug);
  const playerProfile = dashboardData.data?.playerProfile;

  return (
    <div className="rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-4">
      <div className="flex justify-start items-start min-w-[250px]">
        <div className="relative w-24 h-28 justify-end">
          <Image
            src={card_image_url}
            alt="Card Thumbnail"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex mt-2 flex-col flex-shrink">
          <h2 className="mx-[6px] mb-[6px] font-bold text-md text-primary">
            {playerProfile?.name}
          </h2>
          <div className="mx-[6px] flex flex-col text-sm flex-1">
            <p className="pb-1 leading-4 text-primary opacity-80 relative">
              {playerProfile?.club}
            </p>
            <p className="pb-1 leading-4 text-primary opacity-80 relative">
              {playerProfile?.team}
            </p>
            <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
              #{playerProfile?.number}
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-partnersBorders w-full md:w-0 opacity-20"></div>
      <div className="w-full px-[4px] lg:ml-8 md:max-w-[500px]">
        <p className="font-extralight mt-2">Manage guests for this card</p>
        {/* {guests.map((guest, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 border-b border-partnersBorders border-opacity-20 text-sm"
          >
            <div className="flex flex-col">
              <p>{guest.name}</p>
              <p className="md:text-center font-extralight flex-1">
                {guest.email}
              </p>
            </div>
            <div
              className="flex items-center cursor-pointer justify-end"
              onClick={() => handleRemoveGuest(index)}
            >
              <div className="mx-[6px] md:mx-4">remove</div>
              <FontAwesomeIcon
                className="text-chartRed text-md md:text-2xl"
                icon={faXmark}
              />
            </div>
          </div>
        ))} */}

        <div
          className="w-full flex justify-between items-center"
          onClick={toggleEmailInput}
        >
          {!isToggle && (
            <>
              <p> New guest</p>
              <button
                className="flex items-center cursor-pointer"
                type="submit"
              >
                <div className="flex justify-between items-center py-4 text-sm mx-[6px] md:mx-4">
                  invite
                </div>
                <FontAwesomeIcon
                  className=" text-skyblue text-md md:text-2xl"
                  icon={faPlus}
                />
              </button>
            </>
          )}
        </div>

        <AnimatePresence>
          {isToggle && (
            <motion.div
              ref={toggleRef}
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
                className="py-6"
              >
                <p className=" text-sm mb-6 text-start text-primary lg:max-w-769 relative min-w-[256px] transition-opacity duration-300 opacity-100">
                  {emailSubmitted
                    ? 'Invitation sent! Your card is now accessible to your guest. We will notify them shortly.'
                    : 'Invite someone to view this player card by providing their information below.'}
                </p>
                {!emailSubmitted && (
                  <form
                    className="w-full flex flex-col gap-3 items-end"
                    onSubmit={emailSubmit}
                  >
                    <input
                      type="text"
                      name="name"
                      value={invitation.name}
                      placeholder="Type guest name here"
                      className=" bg-offwhite bg-opacity-10 h-8 text-sm bottom-0 left-0 w-full p-3 border border-partnersBorders rounded text-partnersBorders"
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      value={invitation.email}
                      placeholder="Type email here"
                      className=" bg-offwhite bg-opacity-10 h-8 text-sm bottom-0 left-0 w-full p-3 border rounded border-partnersBorders text-partnersBorders"
                      onChange={handleChange}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                      type="submit"
                      className="h-8 py-3 px-6 text-sm leading-6 flex items-center justify-center bg-darkerSkyBlue rounded"
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
    </div>
  );
};

export default OwnedCard;
