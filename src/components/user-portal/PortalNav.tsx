import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faUsers,
  faCircleInfo,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell, faFlag } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PortalNav() {
  return (
    <motion.div className="flex flex-col mt-4 mx-3 text-white">
      <Link href={'/settings'}>
        <div className="flex justify-between items-center bg-cardsDark text-primary opacity-80 rounded p-4 cursor-pointer mb-6 shadow-portalNav">
          <h2 className="text-md">Settings</h2>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>

      <div className="flex items-center my-3 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faUser} />
        <p>Account</p>
      </div>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faBell} />
        <p>Notifications</p>
      </div>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faUsers} />
        <p>Manage referrals</p>
      </div>
      <Link href={'/help-support'}>
        <div className="flex justify-between items-center bg-cardsDark text-primary opacity-80 rounded p-4 cursor-pointer my-6 shadow-portalNav">
          <h2 className="text-md ">Help & Support</h2>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faFlag} />
        <p>Report a problem</p>
      </div>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faCircleInfo} />
        <p>Terms and Policies</p>
      </div>
      <div className="flex border-t border-t-offwhite opacity-75 my-4"></div>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon
          className="text-skyblue mr-3"
          icon={faArrowRightFromBracket}
        />
        <p>Logout</p>
      </div>
    </motion.div>
  );
}
