import React from "react";

import Header from "../commons/Header";
import DescripHeader from "../commons/DescripHeader";
import Footer from "../commons/Footer";
import BoardList from "../pages/board/List/BoardList";
import { useTitle } from "../util/UpdateTitle";

const List = (props) => {
  useTitle('List');
  
  return (
    <div>
      <Header />
      <DescripHeader heading="List" text="전체글 조회"/>
      <BoardList userInfo={props.userInfo}/>
      <Footer />
    </div>
  );
};

export default List;
