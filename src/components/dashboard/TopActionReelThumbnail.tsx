import Image from 'next/image';

const CLUB_LOGO_WIDTH = 50;
const CLUB_LOGO_HEIGHT = 50;

export default function TopActionReelThumbnail({
  home_logo,
  away_logo,
}: {
  home_logo: string | null;
  away_logo: string | null;
}) {
  return (
    <div className="flex w-full h-full rounded-10 overflow-clip">
      <div className="relative flex flex-1 justify-center items-center">
        <div
          className={`absolute right-2 w-[150%] h-[200%] z-20 rotate-[30deg] bg-offwhite`}
        ></div>
        {home_logo && (
          <Image
            className="absolute z-30"
            src={home_logo}
            alt="home-club-logo"
            width={CLUB_LOGO_WIDTH}
            height={CLUB_LOGO_HEIGHT}
            quality={75}
            loading="lazy"
          />
        )}
      </div>
      <div className="relative flex flex-1 justify-center items-center">
        <div
          className={`absolute left-2 w-[150%] h-[200%] z-25 rotate-[30deg] bg-skyblue`}
        ></div>
        {away_logo && (
          <Image
            className="absolute z-30"
            src={away_logo}
            alt="away-club-logo"
            width={CLUB_LOGO_WIDTH}
            height={CLUB_LOGO_HEIGHT}
            quality={75}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
