import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const GuestCard = ({ invite, idx, handleRemoveInvites }) => {
  return (
    <div
      key={idx}
      className="rounded bg-cardsDark p-4 md:py-8 mb-4 shadow-portalNav flex flex-col md:flex-row content-start md:flex-nowrap justify-around items-start gap-2 md:gap-4"
    >
      <div className="flex justify-start items-start min-w-[250px]">
        <div className="relative w-24 h-28 justify-end">
          <Image
            src={invite.card.card_url}
            alt="Card Thumbnail"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex mt-2 flex-col flex-shrink">
          <h2 className="mx-[6px] mb-[6px] font-bold text-md text-primary">
            {invite.card.name}
          </h2>
          <div className="mx-[6px] flex flex-col text-sm flex-1">
            <p className="pb-1 leading-4 text-primary opacity-80 relative">
              {invite.card.club}
            </p>
            <p className="pb-1 leading-4 text-primary opacity-80 relative">
              {invite.card.team}
            </p>
            <p className="leading-4 text-primary opacity-80 lg:max-w-769 relative">
              {invite.card.number}
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-partnersBorders w-full opacity-20 md:w-0"></div>
      <div className="flex flex-col justify-between w-full mt-2 md:max-w-[500px] px-[4px] lg:ml-8">
        <div className="items-start mt-0 w-full">
          <p className="font-extralight text-base">Card owner</p>
          <div className="flex justify-between items-start">
            <div className="text-sm flex flex-col">
              <p className="mb-[2px] pt-2">{invite.inviter.name}</p>
              <p className="md:text-center font-extralight">
                {invite.inviter.email}
              </p>
            </div>
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={() => handleRemoveInvites(idx)}
            >
              <div className="text-sm py-4 mx-2 md:mx-4 text-end">decline</div>
              <FontAwesomeIcon
                className="text-chartRed text-md md:text-2xl"
                icon={faXmark}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCard;
