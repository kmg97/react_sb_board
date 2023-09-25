import {NavLink} from "react-router-dom";
import "./Header.css";

import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useAuth} from "../context/AuthProvider";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };

  const [color, setColor] = useState(false);

  const changeColor = () => {
    if(window.scrollY >= 100){

      setColor(true);

    }else{

        setColor(false);

    }
  }

  window.addEventListener("scroll",changeColor);

  const user = useAuth();
  const {logout} = useAuth();

  const handleLogout = () => {
    // 로그아웃 로직 실행
    const check = window.confirm("로그아웃 하시겠습니까?");
    if(check) {
      logout();
      alert("로그아웃 성공");
    }
    // 원하는 작업을 수행한 후 페이지 이동을 원치 않을 경우 다음 라인 주석 처리
    // history.push('/'); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <div className={color ? "header header-bg":"header"}>
      <NavLink to="/home">
        <h1>KMG's Board</h1>
      </NavLink>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "clicked" : "")}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/board" className={({ isActive }) => (isActive ? "clicked" : "")}>List</NavLink>
        </li>
        {/*<li>*/}
        {/*  <NavLink to="/contact" className={({ isActive }) => (isActive ? "clicked" : "")}>Contact</NavLink>*/}
        {/*</li>*/}
        <li>
          {user.user!=null ?
              <NavLink onClick={handleLogout} to="">Logout</NavLink>
              :
              <NavLink to="/login" className={({ isActive }) => (isActive ? "clicked" : "")}>Login</NavLink>
          }


        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {!click && <FaBars size={20} style={{ color: "#fff" }}/>}
        {click && <FaTimes size={20} style={{ color: "#fff" }}/>}
      </div>
    </div>
  );
};

export default Header;
