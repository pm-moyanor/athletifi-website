import PastMatches from './PastMatches';
import Teammates from './Teammates';
import { ITeammates } from '@/types/Dashboard.type';

const PastMatchesLayout: React.FC<ITeammates> = ({ teammates }: ITeammates) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between my-4 items-center md:items-start w-full px-4 max-w-[620px] md:max-w-none lg:max-w-[1130px]  ">
      <PastMatches />
      <Teammates teammates={teammates} />
    </div>
  );
};

export default PastMatchesLayout;
