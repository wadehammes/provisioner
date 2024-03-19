import { NewsletterForm } from "src/components/NewsletterForm/NewsletterForm.component";
import { Provisioner } from "src/icons/Provisioner.icon";

export const ComingSoonComponent = () => (
  <>
    <div className="leaf-pattern" />
    <div className="container">
      <div className="logo-lockup">
        <Provisioner className="logo" aria-label="Provisioner Logo" />
        <h1>A locally grown agency</h1>
        <p>Leave us your email to be the first to know when we bloom.</p>
        <NewsletterForm />
      </div>
    </div>
  </>
);
