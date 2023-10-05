import React from "react";

import Header from "../components/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/Footer";
import BoardList from "../pages/board/List/BoardList";
import { useTitle } from "../util/UpdateTitle";

const List = (props) => {
  useTitle('List');
  
  return (
    <div>
      <Header />
      <HeroImg2 heading="List" text="전체글 조회"/>
      <BoardList userInfo={props.userInfo}/>
      <Footer />
    </div>
  );
};

export default List;
