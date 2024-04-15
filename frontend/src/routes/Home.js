import React from "react";
import Header from "../commons/Header";
import MainPage from "../pages/main/MainPage";
import Footer from "../commons/Footer";
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
