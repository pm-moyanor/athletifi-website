import { sourceSans3 } from '@/app/utils/helpers';
import MyTeams from '@/components/coach-portal/MyTeams';
import ProfileHeader from '@/components/user-portal/ProfileHeader';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

const CoachProfilePage: React.FC = () => {
  return (
    <div
      className={`bg-cardsBackground w-full h-full p-4 ${sourceSans3.className}`}
    >
      <ProfileHeader
        pageTitle={'Coach Portal'}
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

      <MyTeams />
    </div>
  );
};

export default CoachProfilePage;
