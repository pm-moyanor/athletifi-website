import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import cardImage from '../../../public/assets/img/png/anderson-card-img.png';

const CARD_IMAGE_WIDTH: number = 465;
const CARD_IMAGE_HEIGHT: number = 400;

const CardFlip = () => {
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
      className="w-full h-full overflow-hidden"
      animate={{
        rotateY: isFlipped ? 360 : 0,
        scale: isFlipped ? [1, 1.8, 1.1] : 1,
      }}
      transition={{
        duration: 0.5,
        type: 'spring',
        damping: 10,
      }}
    >
      <Image
        src={cardImage}
        width={CARD_IMAGE_WIDTH}
        height={CARD_IMAGE_HEIGHT}
        alt="Card Image"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default CardFlip;
