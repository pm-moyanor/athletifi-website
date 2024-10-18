import SubmitFootage from '@/components/coach-portal/SubmitFootage';
import { sourceSans3 } from '@/app/utils/helpers';
import MyTeams from '@/components/coach-portal/MyTeams';
import MultiStepForm from '@/components/coach-portal/MultiStepForm';

const CoachProfilePage: React.FC = () => {
  return (
    <div
      className={`bg-cardsBackground w-full h-full p-4 ${sourceSans3.className}`}
    >
      <SubmitFootage />
      <MultiStepForm />
      <MyTeams />
    </div>
  );
};

export default CoachProfilePage;
