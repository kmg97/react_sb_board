import React from "react";

import Header from "../components/common/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/common/Footer";
// import PricingCard from "../components/PricingCard";
import Work from "../components/list/Work";
import { useTitle } from "../util/UpdateTitle";

const Project = () => {
  useTitle('List');
  
  return (
    <div>
      <Header />
      <HeroImg2 heading="List" text="게시글"/>
      <Work />
      <Footer />
    </div>
  );
};

export default Project;
