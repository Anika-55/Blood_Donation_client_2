import React from "react";
import HeroSection from "../../components/HeroSection";
import DonationSteps from "../../components/Donationsteps";
import WhoWeAre from "../../components/WhoWeAre";
import StatisticsSection from "../../components/StatisticsSection";
import FAQSection from "../../components/FQASection";
import VolunteerSection from "../../components/VolunteerSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <DonationSteps />
      <WhoWeAre />
      <VolunteerSection />
      <StatisticsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
