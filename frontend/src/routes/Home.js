import React from "react";
import Header from "../components/Header";
import MainPage from "../pages/main/MainPage";
import Footer from "../components/Footer";
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
