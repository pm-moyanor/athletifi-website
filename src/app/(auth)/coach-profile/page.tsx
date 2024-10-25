
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
    
      {/* <Link href="/coach-profile/match-upload-form"> */}
      
      {/* header submit footage CTA */}
        {/* <div className="flex items-center text-skyblue text-sm md:text-md  max-w-[1030px] mx-auto pb-3 pr-2">
          <div className='border border-skyblue rounded-full p-[4px] w-12 h-12 flex justify-center align-middle ml-auto'> 
             <FontAwesomeIcon icon={faCloudArrowUp} className="my-auto" />
             </div>
        <p className='ml-2 text-primary'>Submit footage</p>
        
        </div>
      </Link> */}
    

      <ProfileHeader pageTitle={'Coach Portal'} userData={{
              amplify_id: null,
              name: null,
              email: null,
              init_notifications: null,
              notifications: null,
              user_delete_status: null,
              owned_cards: null,
              guest_cards: null,
              invites: null
          }}/>

      <MyTeams />
    </div>
  );
};

export default CoachProfilePage;
