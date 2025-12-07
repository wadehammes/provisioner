"use client";

import classNames from "classnames";
import styles from "src/components/HomeOurWork/HomeOurWork.module.css";
import { WorkCardWrapper } from "src/components/HomeOurWork/WorkCardWrapper.component";
import { LeafButtonLink } from "src/components/LeafButton/LeafButtonLink.component";
import { Section } from "src/components/Section/Section.component";
import type { WorkType } from "src/contentful/getWork";

interface HomeOurWorkProps {
  work: WorkType[];
}

export const HomeOurWork = (props: HomeOurWorkProps) => {
  const { work } = props;

  const workWithoutFeatured = work.filter(
    (item) => !item.addToFeaturedCarousel,
  );

  if (workWithoutFeatured.length === 0) {
    return null;
  }

  return (
    <Section id="home-our-work" color="white" topOverlapPadding>
      <div className={classNames(styles.container, styles.bentoGrid)}>
        {workWithoutFeatured
          .filter((item) => item.featuredMedia)
          .map((item, index) => {
            const rowIndex = Math.floor(index / 2);
            const positionInRow = index % 2;
            const patternIndex = rowIndex % 3;

            // Pattern definitions: [first item size, second item size]
            const patterns = [
              {
                first: { class: styles.small, span: 5 },
                second: { class: styles.medium, span: 7 },
              }, // Row 1: 5 and 7
              {
                first: { class: styles.large, span: 8 },
                second: { class: styles.small, span: 4 },
              }, // Row 2: 8 and 4
              {
                first: { class: styles.medium, span: 6 },
                second: { class: styles.medium, span: 6 },
              }, // Row 3: 6 and 6
            ];

            const pattern = patterns[patternIndex];
            const itemConfig =
              positionInRow === 0 ? pattern.first : pattern.second;

            return (
              <WorkCardWrapper
                key={item.id}
                work={item}
                index={index}
                sizeClass={itemConfig.class}
                span5={itemConfig.span === 5}
                span7={itemConfig.span === 7}
              />
            );
          })}
      </div>
      <div className={classNames(styles.container)}>
        <div className={styles.ctaContainer}>
          <p className="subtitle">Want to see your project here?</p>
          <LeafButtonLink
            href="/start-your-project"
            variant="outlined"
            color="dark"
          >
            Start your project with us
          </LeafButtonLink>
        </div>
      </div>
    </Section>
  );
};
