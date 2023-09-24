import "./MainPage.css";

import React from "react";
import IntroImg from "../assets/intro-bg.jpg";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImg} alt="IntroImg" />
      </div>
      <div className="content">
        <p>Demo BOARD.</p>
        <h1>Demo BOARD</h1>
        <div>
          <Link to="/board" className="btn">
            전체글
          </Link>
          <Link to="/contact" className="btn btn-light">
            문의
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
