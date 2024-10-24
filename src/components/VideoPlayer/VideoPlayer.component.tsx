"use client";

import classNames from "classnames";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Loader } from "src/components/Loader/Loader.component";
import { PlayIcon } from "src/components/VideoPlayer/PlayIcon.component";
import styles from "src/components/VideoPlayer/VideoPlayer.module.css";
import { useIsBrowser } from "src/hooks/useIsBrowser";
import useWindowFocus from "src/hooks/useWindowFocus";

interface VideoPlayerProps {
  autoPlay?: boolean;
  controls?: boolean;
  playInView?: boolean;
  rounded?: boolean;
  url: string;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const {
    autoPlay = false,
    controls = false,
    playInView = false,
    rounded = false,
    url,
  } = props;
  const [playing, setPlaying] = useState(autoPlay);
  const isBrowser = useIsBrowser();
  const isFocused = useWindowFocus();

  if (!isBrowser) {
    return null;
  }

  const shouldPlayAlways = autoPlay ? playInView : playing && isFocused;

  return (
    <div
      className={classNames(styles.videoPlayer, {
        [styles.rounded]: rounded,
      })}
    >
      <ReactPlayer
        controls={controls}
        fallback={<Loader />}
        light={!autoPlay}
        loop
        muted
        playIcon={<PlayIcon />}
        url={url}
        volume={0}
        playing={shouldPlayAlways}
        onPause={() => setPlaying(false)}
        onClickPreview={() => setPlaying(true)}
        playsinline
      />
    </div>
  );
};
