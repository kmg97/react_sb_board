import React from "react";
import Header from "../components/common/Header";
import MainPage from "../components/MainPage";
import Footer from "../components/common/Footer";
import { useTitle } from "../util/UpdateTitle";

const Home = () => {
  useTitle('Home');
  
  return (
    <div>
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
};

export default Home;
