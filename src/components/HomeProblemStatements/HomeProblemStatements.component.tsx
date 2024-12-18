import { Suspense } from "react";
import styles from "src/components/HomeProblemStatements/HomeProblemStatements.module.css";
import { problems } from "src/components/HomeProblemStatements/problems";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { ProblemCard } from "src/components/ProblemCard/ProblemCard.component";
import { Section } from "src/components/Section/Section.component";

export const HomeProblemStatements = () => {
  return (
    <Section id="section-home-solutions" color="white" topOverlapPadding>
      <div className="container centered light">
        <header className="section-header">
          <h2>
            We do lots of things, but we do these things <strong>really</strong>{" "}
            well.
          </h2>
        </header>
        <div className={styles.cardGrid}>
          {problems.map((problem, index) => (
            <ProblemCard key={problem.title} index={index} problem={problem} />
          ))}
        </div>
        <p className="subtitle" style={{ paddingBottom: 0 }}>
          Our first step is always to listen. We can figure out the next step
          together.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <LeafButtonLink
            href="/start-your-project"
            variant="outlined"
            color="dark"
          >
            Start your project with us
          </LeafButtonLink>
        </Suspense>
      </div>
    </Section>
  );
};
