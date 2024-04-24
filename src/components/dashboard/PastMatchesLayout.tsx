import PastMatches from './PastMatches';
import Teammates from './Teammates';

const PastMatchesLayout: React.FC = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row justify-between my-4 items-center md:items-start w-full md:max-w-none lg:max-w-[1130px]">
      <PastMatches />
      <Teammates />
    </div>
  );
};

export default PastMatchesLayout;
