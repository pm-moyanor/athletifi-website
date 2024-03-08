// player.js
import ReactPlayer from 'react-player';

export function ReactPlayerAsVideo(props) {
  const { asset, src, poster, blurDataURL, ...rest } = props;
  const config = { file: { attributes: { poster } } };

  return (
    <ReactPlayer
      className=""
      url={src}
      config={config}
      width="100%"
      height="100%"
      {...rest}
    />
  );
}
