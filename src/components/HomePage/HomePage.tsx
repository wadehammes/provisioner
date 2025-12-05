import { draftMode } from "next/headers";
import { Hero } from "src/components/Hero/Hero";
import { HomeFeaturedWorkCarousel } from "src/components/HomeFeaturedWorkCarousel/HomeFeaturedWorkCarousel.component";
import { HomeOurWork } from "src/components/HomeOurWork/HomeOurWork.component";
import { HomeProblemStatements } from "src/components/HomeProblemStatements/HomeProblemStatements.component";
import { fetchWork } from "src/contentful/getWork";

export const HomePage = async () => {
  const draft = await draftMode();
  const work = await fetchWork({ preview: draft.isEnabled });

  return (
    <>
      <Hero
        h1="We grow brands, <strong>together</strong>"
        buttonProps={{
          label: "Learn how we can help",
          href: "#section-home-solutions",
        }}
      />
      <HomeFeaturedWorkCarousel work={work} />
      <HomeOurWork work={work} />
      <HomeProblemStatements />
    </>
  );
};
