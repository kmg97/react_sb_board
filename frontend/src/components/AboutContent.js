import "./AboutContentStyles.css";

import React from "react";
import { Link } from "react-router-dom";
import REACT from "../assets/react.png";
import HTML from "../assets/html.png";
import CSS from "../assets/css3.png"
import JAVASCRIPT from "../assets/js.png"
import JQUERY from "../assets/jquery.png"
import PHP from "../assets/php.png"
const AboutContent = () => {
  return (
    <div className="about">
      <div className="left">
        <h1>Who Am I?</h1>
        <p>대구 Web 개발자 김민규입니다.<br/>
        웹 개발을 주력으로 하고 각종 오픈소스,<br/>
        라이브러리, 프레임워크 활용이 가능합니다.<br/>
        </p>
        <Link to="/contact">
          <button className="btn">Contact</button>
        </Link>
      </div>
      <div className="right">
        <h1>Skills</h1>
        <div className="img-container">
          <div className="img-stack">
            <img src={HTML} 
            className="img" 
            alt="true" />
          </div>
          <div className="img-stack">
            <img src={CSS} 
            className="img" 
            alt="true" />
          </div>
          <div className="img-stack">
            <img src={JAVASCRIPT} 
            className="img" 
            alt="true" />
          </div>
          <div className="img-stack">
            <img src={JQUERY} 
            className="img" 
            alt="true" />
          </div>
          <div className="img-stack">
            <img src={REACT} 
            className="img" 
            alt="true" />
          </div>
          <div className="img-stack">
            <img src={PHP}
                 className="img"
                 alt="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
