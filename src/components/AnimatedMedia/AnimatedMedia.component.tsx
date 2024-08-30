"use client";

import classNames from "classnames";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import styles from "src/components/AnimatedMedia/AnimatedMedia.module.css";
import { ContentImage } from "src/contentful/image";
import { isVideo } from "src/utils/helpers";

interface AnimatedMediaProps {
  className?: string;
  media: ContentImage | null;
}

export const AnimatedMedia = (props: AnimatedMediaProps) => {
  const { media, className } = props;

  if (!media) {
    return null;
  }

  return (
    <InView triggerOnce>
      {({ inView, ref }) => {
        const video = isVideo(media?.src);

        if (video) {
          return (
            <video
              ref={ref}
              playsInline
              loop
              preload="auto"
              autoPlay
              muted
              className={classNames(className, styles.media, {
                [styles.inView]: inView,
              })}
            >
              <source src={media?.src} type="video/mp4"></source>
            </video>
          );
        }

        return (
          <Image
            ref={ref}
            key={media.src}
            src={`https:${media.src}?q=75`}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="lazy"
            style={{ height: "auto" }}
            className={classNames(className, styles.media, {
              [styles.inView]: inView,
            })}
            quality={85}
          />
        );
      }}
    </InView>
  );
};