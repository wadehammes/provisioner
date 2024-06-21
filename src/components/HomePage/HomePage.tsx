import { Hero } from "src/components/Hero/Hero";
import { HomeOurWork } from "src/components/HomeOurWork/HomeOurWork.component";
import { HomeProblemStatements } from "src/components/HomeProblemStatements/HomeProblemStatements.component";

export const HomePage = () => {
  return (
    <>
      <Hero
        h1="We grow brands, <strong>together</strong>"
        buttonProps={{
          label: "Learn how we can help",
          href: "#section-home-solutions",
        }}
      />
      <HomeOurWork />
      <HomeProblemStatements />
    </>
  );
};
