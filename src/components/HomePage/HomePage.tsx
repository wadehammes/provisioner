import { draftMode } from "next/headers";
import { Hero } from "src/components/Hero/Hero";
import { HomeOurWork } from "src/components/HomeOurWork/HomeOurWork.component";
import { HomeProblemStatements } from "src/components/HomeProblemStatements/HomeProblemStatements.component";
import { fetchWork } from "src/contentful/getWork";

export const HomePage = async () => {
  const work = await fetchWork({ preview: draftMode().isEnabled });

  return (
    <>
      <Hero
        h1="We grow brands, <strong>together</strong>"
        buttonProps={{
          label: "Learn how we can help",
          href: "#section-home-solutions",
        }}
      />
      <HomeOurWork work={work} />
      <HomeProblemStatements />
    </>
  );
};
