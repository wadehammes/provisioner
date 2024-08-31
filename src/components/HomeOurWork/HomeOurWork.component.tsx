"use client";

import classNames from "classnames";
import { Carousel } from "src/components/Carousel/Carousel.component";
import styles from "src/components/HomeOurWork/HomeOurWork.module.css";
import { Section } from "src/components/Section/Section.component";
import { WorkSlide } from "src/components/WorkSlide/WorkSlide.component";
import { WorkType } from "src/contentful/getWork";

interface HomeOurWorkProps {
  work: WorkType[];
}

export const HomeOurWork = (props: HomeOurWorkProps) => {
  const { work } = props;

  return (
    <Section id="home-our-work" noTopPadding>
      <div className="container">
        <h2 className={classNames("eyebrow", styles.header)}>Our work</h2>
      </div>

      <div className={classNames(styles.homeOurWork)}>
        <Carousel
          items={work.map((work, index) => (
            <div
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
    </Section>
  );
};
