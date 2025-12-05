"use client";

import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "src/components/Carousel/Carousel.module.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "usehooks-ts";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
}

export const Carousel = (props: CarouselProps) => {
  const { className, items } = props;
  const isMobile = useMediaQuery("(max-width: 999px)");

  if (!items) {
    return null;
  }

  const hasMoreThan8Slides = items.length > 8;
  const shouldUseFraction = isMobile && hasMoreThan8Slides;

  const paginationConfig = shouldUseFraction
    ? {
        type: "fraction" as const,
        renderFraction: (currentClass: string, totalClass: string) => {
          return `<span class="${currentClass}"></span> / <span class="${totalClass}">8</span>`;
        },
      }
    : { clickable: true };

  return (
    <div className={classNames(className, styles.swiperContainer)}>
      <Swiper
        modules={[Pagination, Autoplay, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          delay: 10000,
        }}
        pagination={paginationConfig}
        navigation
        centeredSlides
        draggable
        speed={750}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
