import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useUserData } from '@/states/userStore';

const UserNotificationsModal = ({
  setShowInitNotifications,
}: {
  setShowInitNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userData, setLatestChange } = useUserData();

  async function enableNotifications() {
    // ENABLE ALL NOTIFICATION TYPES FOR USER && SET INIT NOTIFICATIONS AS TRUE
    // UPDATE STATE TO CONTAIN ALL NOTIFICATION TYPES
    setLatestChange({
      notification_types: ['All'],
      value: true,
    });
    await new Promise((r) => setTimeout(r, 3000));

    // DISABLE MODAL
    setShowInitNotifications(false);
  }

  function disableNotifications() {
    // DISABLE MODAL
    setShowInitNotifications(false);
    // SET INITIALIZED NOTIFICATIONS UNDER USER AS TRUE
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-cardsDark shadow-lg w-[550px] h-72 flex rounded-10 opacity-95 relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-offwhite z-20 absolute top-0 right-0 mr-6 mt-4 cursor-pointer"
          size="xl"
          onClick={disableNotifications}
        />
        <div className="relative flex items-center justify-center w-1/4">
          <FontAwesomeIcon
            icon={faBell}
            className="text-skyblue z-20 absolute"
            size="2xl"
          />
          <div className="bg-skyblue opacity-30 w-full h-full rounded-l-10"></div>
        </div>
        <div className="flex flex-col justify-around p-4 w-full">
          <h2 className="text-lg text-offwhite mt-4">Don&apos;t miss out!</h2>
          <p className="text-md font-extralight text-offwhite -mt-4">
            Would you like to receive updates and important announcements?
            Enable notifications to stay in the loop. You can always update your
            preferences in the user settings page.
          </p>
          <div className="flex justify-end mt-4">
            <button
              className="text-basemd text-primary font-extralight py-px mr-6 border-b border-skyblue hover:text-skyblue"
              onClick={enableNotifications}
            >
              Enable
            </button>
            <button
              className="text-basemd text-primary font-extralight py-px mr-2 border-b border-rose-600 hover:text-rose-600"
              onClick={disableNotifications}
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotificationsModal;
