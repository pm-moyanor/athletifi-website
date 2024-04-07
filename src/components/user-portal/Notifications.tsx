import { useState } from 'react';

const dummyDataNotifications = [
  {
    idx: 0,
    name: 'Referral Notifications',
    isSet: true,
  },
  {
    idx: 1,
    name: 'AthletiFi Updates',
    isSet: true,
  },
  {
    idx: 2,
    name: 'General Highlights',
    isSet: false,
  },
  {
    idx: 3,
    name: 'My Player Updates',
    isSet: true,
  },
];

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState(
    dummyDataNotifications,
  );

  function handleChange(i: number) {
    const updatedSettings = [...notificationSettings];
    updatedSettings[i].isSet = !notificationSettings[i].isSet;
    setNotificationSettings(updatedSettings);
  }

  return (
    <div className="flex flex-col mt-16 text-primary" id="notifications">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-4">
        Notifications
      </h2>
      <div className="text-offwhite mx-4 my-8">
        What would you like to be notified via email?
      </div>
      <div className="rounded bg-cardsDark">
        {notificationSettings.map((setting, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center py-4 mx-4 ${idx > 0 ? 'border-t border-t-offwhite' : ''}`}
          >
            <div>{setting.name}</div>
            <div className="flex items-center cursor-pointer">
              <div className="toggle-scale">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={setting.isSet}
                    onChange={() => handleChange(idx)}
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
