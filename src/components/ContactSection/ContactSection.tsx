import LeafButtonLink from "src/components/LeafButton/LeafButtonLink.component";
import { Section } from "src/components/Section/Section.component";

export const ContactSection = () => {
  return (
    <Section id="contact-section" color="green" noTopPadding>
      <div className="container centered">
        <header className="sectionHeader">
          <h2>Just have a question? Want to say hello? Email us.</h2>
        </header>
        <p>
          <LeafButtonLink
            href="mailto:hello@provisioner.agency"
            variant="outlined"
          >
            hello@provisioner.agency
          </LeafButtonLink>
        </p>
      </div>
    </Section>
  );
};
