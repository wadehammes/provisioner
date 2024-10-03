"use client";

import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "src/components/Carousel/Carousel.module.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: ReactNode[];
}

export const Carousel = (props: CarouselProps) => {
  const { className, items } = props;

  if (!items) {
    return null;
  }

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
        pagination={{ clickable: true }}
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
