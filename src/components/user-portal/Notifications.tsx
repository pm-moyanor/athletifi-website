import { useState, useEffect } from 'react';
import {
  NotificationTitles,
  NotificationTypes,
  NotificationPreferences,
  emptyNotifications,
  LatestChange,
  emptyLatestChange,
} from '@/types/UserNotifications.type';
import { getCurrentUser } from 'aws-amplify/auth';

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationPreferences>(emptyNotifications);
  const [latestChange, setLatestChange] =
    useState<LatestChange>(emptyLatestChange);
  const [amplifyId, setAmplifyId] = useState<string | null>(null);

  useEffect(() => {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

    const fetchHelper = async (amplify_id: string | null) => {
      const response = await fetch(
        `${baseURL}/notifications?amplify_id=${amplify_id}`,
      );
      const data = await response.json();
      return data;
    };

    getCurrentUser().then((user) => {
      setAmplifyId(user.username);
      fetchHelper(user.username).then((userPreferences) => {
        setNotificationSettings(
          transformNotificationPreferences(userPreferences.result),
        );
      });
    });
  }, []);

  useEffect(() => {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api';

    const postHelper = async (
      amplify_id: string | null,
      notification_type: string | null,
    ) => {
      const response = await fetch(`${baseURL}/notifications`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          amplify_id: amplify_id,
          notification_type: notification_type,
        }),
      });
      const data = await response.json();
      return data;
    };

    const deleteHelper = async (
      amplify_id: string | null,
      notification_type: string | null,
    ) => {
      const response = await fetch(
        `${baseURL}/notifications?amplify_id=${amplify_id}&notification_type=${notification_type}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      const data = await response.json();
      return data;
    };

    if (latestChange.value) {
      postHelper(latestChange.amplify_id, latestChange.notification_type);
    } else {
      deleteHelper(latestChange.amplify_id, latestChange.notification_type);
    }
  }, [latestChange]);

  function transformNotificationPreferences(dataArray: NotificationTypes[]) {
    const tmp = { ...emptyNotifications };
    dataArray.map((item: keyof NotificationPreferences) => {
      tmp[item] = true;
    });
    return tmp;
  }

  function handleChange(notificationType: keyof NotificationPreferences) {
    const tmp = { ...notificationSettings };
    tmp[notificationType] = !notificationSettings[notificationType];
    setNotificationSettings(tmp);
    setLatestChange({
      amplify_id: amplifyId,
      notification_type: notificationType,
      value: tmp[notificationType],
    });
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="notifications">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4 shadow-portalNav">
        Notifications
      </h2>
      <div className="text-offwhite mx-4 my-8">
        What would you like to be notified via email?
      </div>
      <div className="rounded bg-cardsDark shadow-portalNav">
        {NotificationTitles.map((setting, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center py-4 mx-4 ${idx > 0 ? 'border-t border-t-partnersBorders border-opacity-20' : ''}`}
          >
            <div>{setting.name}</div>
            <div className="flex items-center cursor-pointer">
              <div className="toggle-scale">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={
                      notificationSettings[
                        setting.value as keyof NotificationPreferences
                      ]
                    }
                    onChange={() =>
                      handleChange(
                        setting.value as keyof NotificationPreferences,
                      )
                    }
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
