import React from "react";
import Header from "../components/common/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/common/Footer";
import Form from "../components/Form";
import { useTitle } from "../util/UpdateTitle";

const Write = (props) => {
  useTitle('Board Write');
  
  return (
    <div>
      <Header />
      <HeroImg2 heading="글쓰기" text="ContactPage"/>
      <Form onAddContact={props.onAddContact}/>
      <Footer />
    </div>
  );
};

export default Write;
