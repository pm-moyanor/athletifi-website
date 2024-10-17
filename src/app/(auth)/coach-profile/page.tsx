import SubmitFootage from '@/components/coach-portal/SubmitFootage';
import { sourceSans3 } from '@/app/utils/helpers';
import MyTeams from '@/components/coach-portal/MyTeams';
import ProgressIndicator from '@/components/coach-portal/ProgressIndicator';

const CoachProfilePage: React.FC = () => {
  return (
    <div
      className={`bg-cardsBackground w-full h-full p-4 ${sourceSans3.className}`}
    >
      <SubmitFootage />
      <ProgressIndicator activeStep={2} />
      <MyTeams />
    </div>
  );
};

export default CoachProfilePage;
