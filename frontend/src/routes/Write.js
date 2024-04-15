import React from "react";
import Header from "../commons/Header";
import DescripHeader from "../commons/DescripHeader";
import Footer from "../commons/Footer";
import BoardWrite from "../pages/board/BoardWrite";
import { useTitle } from "../util/UpdateTitle";

const Write = (props) => {
  useTitle('BoardDetail Write');
  
  return (
    <div>
      <Header />
      <DescripHeader heading="Write" text="글쓰기"/>
      <BoardWrite onAddContact={props.onAddContact}/>
      <Footer />
    </div>
  );
};

export default Write;
