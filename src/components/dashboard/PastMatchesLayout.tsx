import PastMatches from './PastMatches';
import Teammates from './Teammates';
import React, { useRef, useEffect, useState } from 'react';

const PastMatchesLayout: React.FC = () => {
  const [height, setHeight] = useState(0);
  const pastMatchesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (pastMatchesRef.current) {
        setHeight(pastMatchesRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="h-full flex flex-col lg:flex-row justify-between my-4 items-center md:items-start w-full md:max-w-none lg:max-w-[1130px]">
      <PastMatches />
      <Teammates />
    </div>
  );
};

export default PastMatchesLayout;
