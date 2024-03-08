'use client';

import dynamic from 'next/dynamic';
import { useState, useRef, useCallback } from 'react';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function VideoPlayer(props) {
  const { src, poster, startTimeSeconds } = props;
  const config = {
    file: { attributes: { poster } },
    // youtube: {
    //   playerVars: {
    //     start: startTimeSeconds,
    //   },
    // },
  };

  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef();

  const onReady = useCallback(
    (player) => {
      if (!isReady) {
        playerRef.current = player;
        playerRef?.current?.seekTo(startTimeSeconds, 'seconds');
        setIsReady(true);
      }
    },
    [isReady],
  );

  return (
    <ReactPlayer
      ref={playerRef}
      className=""
      url={src}
      config={config}
      width="100%"
      height="100%"
      controls={true}
      onReady={onReady}
    />
  );
}
