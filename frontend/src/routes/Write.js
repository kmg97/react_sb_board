import React from "react";
import Header from "../components/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/Footer";
import BoardWrite from "../pages/board/BoardWrite";
import { useTitle } from "../util/UpdateTitle";

const Write = (props) => {
  useTitle('Board Write');
  
  return (
    <div>
      <Header />
      <HeroImg2 heading="글쓰기" text="ContactPage"/>
      <BoardWrite onAddContact={props.onAddContact}/>
      <Footer />
    </div>
  );
};

export default Write;
