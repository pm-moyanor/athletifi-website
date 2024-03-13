import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
// import cardImage from '../../../public/assets/img/png/anderson-card-img.png';
import cardImage from '../../../public/assets/img/png/jose-card-img.png';

const CARD_IMAGE_WIDTH: number = 465;
const CARD_IMAGE_HEIGHT: number = 400;

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(!isFlipped);

    // const timeout = setTimeout(() => {
    //   setIsFlipped(false);
    // }, 500);

    // return () => clearTimeout(timeout);
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
      <div>
        <Image
          src={cardImage}
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
