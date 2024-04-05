'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const dummyDataUser = {
  email: 'nameofuser@gmail.com',
  password: '**********',
};

export default function AccountDetails() {
  const [userData] = useState(dummyDataUser);

  function handleUserChange() {}

  function handlePassChange() {}

  return (
    <div className="flex flex-col mt-16 text-primary">
      <h2 className="rounded bg-cardsDark text-settingsGray py-2 px-2 md:px-4 shadow-portalNav">
        Account Details
      </h2>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 mt-4">
        <div>{userData.email}</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleUserChange}
        >
          <div className="mx-2 md:mx-4">remove</div>
          <FontAwesomeIcon
            className="text-skyblue text-md md:text-2xl"
            icon={faPencil}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-offwhite">
        <div>password: **********</div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handlePassChange}
        >
          <div className="mx-2 md:mx-4">remove</div>
          <FontAwesomeIcon
            className="text-skyblue text-md md:text-2xl"
            icon={faPencil}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-4 mx-2 md:mx-4 border-t border-t-offwhite">
        <div className="text-xs">Delete Account</div>
        <FontAwesomeIcon
          className="text-chartRed cursor-pointer text-md md:text-2xl"
          icon={faTrashCan}
        />
      </div>
    </div>
  );
}
