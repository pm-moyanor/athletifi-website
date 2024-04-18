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

export default function PortalNav({
  setIsOpenSideNav,
}: {
  setIsOpenSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div className="flex flex-col mt-4 mx-3 text-white">
      <Link href={'/settings'} onClick={() => setIsOpenSideNav(false)}>
        <div className="flex justify-between items-center bg-cardsDark text-primary opacity-80 rounded p-4 cursor-pointer mb-6 shadow-portalNav">
          <h2 className="text-md">Settings</h2>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>

      <Link href={'/settings'} onClick={() => setIsOpenSideNav(false)}>
        <div className="flex items-center my-3 mx-3 cursor-pointer">
          <FontAwesomeIcon className="text-skyblue mr-3" icon={faUser} />
          <p>Account</p>
        </div>
      </Link>

      <Link
        href={'/settings#notifications'}
        onClick={() => setIsOpenSideNav(false)}
      >
        <div className="flex items-center my-4 mx-3 cursor-pointer">
          <FontAwesomeIcon className="text-skyblue mr-3" icon={faBell} />
          <p>Notifications</p>
        </div>
      </Link>

      <Link
        href={'/settings#manage-referrals'}
        onClick={() => setIsOpenSideNav(false)}
      >
        <div className="flex items-center my-4 mx-3 cursor-pointer">
          <FontAwesomeIcon className="text-skyblue mr-3" icon={faUsers} />
          <p>Manage referrals</p>
        </div>
      </Link>

      <Link href={'/help-support'} onClick={() => setIsOpenSideNav(false)}>
        <div className="flex justify-between items-center bg-cardsDark text-primary opacity-80 rounded p-4 cursor-pointer my-6 shadow-portalNav">
          <h2 className="text-md ">Help & Support</h2>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Link>
      <a
        href="mailto:report-a-problem@athleti.fi?subject=Problem%20Report&body=Description%20of%20the%20Problem:%0D%0A[Please%20describe%20the%20problem%20you%20encountered%20in%20detail]%0D%0A%0D%0AWhat%20were%20you%20trying%20to%20do%20when%20the%20problem%20occurred?%0D%0A[Explain%20what%20you%20were%20attempting%20to%20do%20on%20the%20website]%0D%0A%0D%0AWhat%20did%20you%20expect%20to%20happen?%0D%0A[Describe%20what%20you%20thought%20should%20have%20happened]%0D%0A%0D%0AWhat%20actually%20happened?%0D%0A[Describe%20what%20occurred%20instead]%0D%0A%0D%0AAny%20additional%20information%20that%20might%20be%20helpful:%0D%0A[Feel%20free%20to%20include%20any%20other%20details,%20such%20as%20screenshots%20or%20links,%20that%20could%20assist%20us%20in%20understanding%20the%20problem]%0D%0A%0D%0AThank%20you%20for%20bringing%20this%20to%20our%20attention.%20We%20appreciate%20your%20help%20in%20improving%20our%20website.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]"
        className="flex my-4"
      >
        <div className="flex items-center my-4 mx-3 cursor-pointer">
          <FontAwesomeIcon className="text-skyblue mr-3" icon={faFlag} />
          <p>Report a problem</p>
        </div>
      </a>
      <div className="flex items-center my-4 mx-3 cursor-pointer">
        <FontAwesomeIcon className="text-skyblue mr-3" icon={faCircleInfo} />
        <p>
          <Link
            href="/terms-of-use"
            className="hover:text-skyblue hover:underline"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy-policy"
            className="hover:text-skyblue hover:underline"
          >
            Policies
          </Link>
        </p>
      </div>
      <div className="flex border-t border-t-partnersBorders my-8"></div>
      <div className="flex items-center my-2 mx-3 cursor-pointer">
        <FontAwesomeIcon
          className="text-skyblue mr-3"
          icon={faArrowRightFromBracket}
        />
        <p>Logout</p>
      </div>
    </motion.div>
  );
}
