import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';

const CARD_IMAGE_WIDTH: number = 485;
const CARD_IMAGE_HEIGHT: number = 420;

const FlipCard = ({ cardUrl }: { cardUrl: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped((prevState) => !prevState);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: isFlipped ? 360 : 0,
      }}
      transition={{
        duration: 0.4,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
    >
      <div className={`inline-block relative md:max-w-96 lg:max-w-none`}>
        <Image
          src={cardUrl}
          alt="Player card"
          width={CARD_IMAGE_WIDTH}
          height={CARD_IMAGE_HEIGHT}
          quality={75}
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default FlipCard;
