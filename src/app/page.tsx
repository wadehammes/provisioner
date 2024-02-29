import type { Metadata } from "next";
import { Provisioner } from "src/icons/Provisioner.icon";

export const metadata: Metadata = {
  title: "Provisioner",
  description: "Together we grow.",
};

const Home = () => {
  return (
    <div className="container">
      <div className="logo-lockup">
        <Provisioner className="logo" />
        <span className="title">Coming Soon</span>
      </div>
    </div>
  );
};

export default Home;
