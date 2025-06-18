"use client";

import Image from "next/image";
import type { ContentImage } from "src/contentful/image";
import { isVideo } from "src/utils/helpers";

interface StaticMediaProps {
  className?: string;
  media: ContentImage | null;
  priority?: boolean;
}

export const StaticMedia = (props: StaticMediaProps) => {
  const { media, className, priority } = props;

  if (!media) {
    return null;
  }

  const video = isVideo(media?.src);

  if (video) {
    return (
      <video
        playsInline
        loop
        preload="auto"
        autoPlay
        muted
        className={className}
      >
        <source src={media?.src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      key={media.src}
      src={`https:${media.src}?q=75`}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading={priority ? "eager" : "lazy"}
      className={className}
      quality={85}
      priority={priority}
    />
  );
};
