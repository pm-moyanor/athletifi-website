import SubmitFootage from '@/components/coach-portal/SubmitFootage';
import { sourceSans3 } from '@/app/utils/helpers';
import Team from '@/components/coach-portal/Team';

const CoachProfilePage: React.FC = () => {
  return (
    <div
      className={`bg-cardsBackground w-full h-full p-4 ${sourceSans3.className}`}
    >
      <SubmitFootage />
      <Team />
    </div>
  );
};

export default CoachProfilePage;
