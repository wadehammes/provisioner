import { Suspense } from "react";
import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Section } from "src/components/Section/Section.component";

export const ContactSection = () => {
  return (
    <Section id="contact-section" color="green" noTopPadding>
      <div className="container centered">
        <header className="section-header">
          <h2>Just have a question? Want to say hello? Email us.</h2>
        </header>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <LeafButtonLink
              href="mailto:hello@provisioner.agency"
              variant="outlined"
            >
              hello@provisioner.agency
            </LeafButtonLink>
          </Suspense>
        </div>
      </div>
    </Section>
  );
};
