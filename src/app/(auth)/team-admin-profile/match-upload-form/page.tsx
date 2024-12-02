import SubmitFootage from '@/components/coach-portal/SubmitFootage';
import { sourceSans3 } from '@/app/utils/helpers';
import ProfileHeader from '@/components/user-portal/ProfileHeader';
import MultiStepForm from '@/components/coach-portal/MultiStepForm';

const MatchUploadFormPage: React.FC = () => {
  return (
    <div
      className={`bg-cardsBackground w-full h-full p-4 ${sourceSans3.className}`}
    >
      <ProfileHeader
        pageTitle={'Submit Footage'}
        userData={{
          amplify_id: null,
          name: null,
          email: null,
          init_notifications: null,
          notifications: null,
          user_delete_status: null,
          owned_cards: null,
          guest_cards: null,
          invites: null,
        }}
      />
      <SubmitFootage />
      {/* form components */}
      <MultiStepForm />
    </div>
  );
};

export default MatchUploadFormPage;
