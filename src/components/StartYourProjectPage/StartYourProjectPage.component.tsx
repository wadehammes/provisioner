import { ContactSection } from "src/components/ContactSection/ContactSection";
import { StartYourProjectForm } from "src/components/StartYourProjectForm/StartYourProjectForm.component";

export const StartYourProjectPage = () => {
  return (
    <>
      <div className="container centered">
        <div className="hero reduced">
          <header className="page-header secondary">
            <h1>
              You have a <strong>vision</strong>, we know how to bring it to
              life. Let's talk.
            </h1>
            <p className="subtitle">
              Send us your project info and we will get back to you within 24-48
              hours.
            </p>
          </header>
        </div>
        <StartYourProjectForm />
        <ContactSection />
      </div>
    </>
  );
};
