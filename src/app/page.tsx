import type { Metadata } from "next";
import { NewsletterForm } from "src/components/NewsletterForm/NewsletterForm.component";
import { Provisioner } from "src/icons/Provisioner.icon";

export const metadata: Metadata = {
  title: "Provisioner",
  description: "Together we grow.",
};

const Home = () => {
  return (
    <>
      <div className="leaf-pattern" />
      <div className="container">
        <div className="logo-lockup">
          <Provisioner className="logo" />
          <h1>Coming Soon</h1>
          <p>
            See you in Spring 2024. Leave us your email to be the first to know
            when we launch.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </>
  );
};

export default Home;
