"use client";

import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import { Carousel } from "src/components/Carousel/Carousel.component";
import styles from "src/components/HomeFeaturedWorkCarousel/HomeFeaturedWorkCarousel.module.css";
import { Section } from "src/components/Section/Section.component";
import { WorkSlide } from "src/components/WorkSlide/WorkSlide.component";
import type { WorkType } from "src/contentful/getWork";

interface HomeFeaturedWorkCarouselProps {
  work: WorkType[];
}

export const HomeFeaturedWorkCarousel = (
  props: HomeFeaturedWorkCarouselProps,
) => {
  const { work } = props;

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section id="home-case-studies" noTopPadding>
      <div
        ref={ref}
        className={classNames(styles.animatedContainer, {
          [styles.fadeIn]: inView,
        })}
      >
        <div className="container">
          <h2 className={classNames("eyebrow", styles.header)}>
            Featured work
          </h2>
        </div>

        <div className={classNames(styles.homeFeaturedWorkCarousel)}>
          <Carousel
            items={work
              .filter((work) => work.addToFeaturedCarousel)
              .map((work, index) => (
                <div
                  key={work.id}
                  className={classNames(
                    "container centered",
                    styles.slideContainer,
                  )}
                >
                  <WorkSlide work={work} index={index} />
                </div>
              ))}
          />
        </div>
      </div>
    </Section>
  );
};
