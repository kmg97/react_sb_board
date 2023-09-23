import React from "react";
import Header from "../components/common/Header";
import HeroImg2 from "../components/HeroImg2";
import AboutContent from "../components/AboutContent";
import Footer from "../components/common/Footer";
import { useTitle } from "../util/UpdateTitle";

const About = () => {
    // 페이지별 컴포넌트 설정
  useTitle("About");

  return (
    <div>
      <Header />
      <HeroImg2 heading="About" text="AboutPage" />
      <AboutContent />
      <Footer />
    </div>
  );
};

export default About;
