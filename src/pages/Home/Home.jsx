import React from "react";
import HeroSection from "../../components/HeroSection";
import DonationSteps from "../../components/Donationsteps";

import WhoWeAre from "../../components/WhoWeAre";
import StatisticsSection from "../../components/StatisticsSection";
import VolunteerSection from "../../components/VolunteerSection";
import WhyDonate from "../../components/WhyDonate";
import Eligibility from "../../components/Eligibility";
import FAQ from "../../components/FAQ";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhyDonate />
      <Eligibility />
      <DonationSteps />
      <WhoWeAre />
      <VolunteerSection />
      <StatisticsSection />
      <FAQ />
    </div>
  );
};

export default Home;
