import React from 'react';
import "./DetailInfoCard.css";
import {useAuth} from "../context/AuthProvider";
import {NavLink, useNavigate} from "react-router-dom"; // 스타일링을 위한 CSS 파일을 가져옵니다.

const Board = (props) => {
    const user = useAuth().user;
    const navigate = useNavigate();

    return (
        <div className="detail-info-card">
            <h2 className="detail-name">제목 : {props.title}</h2>
            <hr/>
            <p className="detail-name">작성자 : {props.username}</p>
            <hr/>
            <p className="detail-time">작성시간 : {props.time}</p>
            <p className="detail-text">글 본문 : {props.text}</p>
            <div className="two-btn">
            {user.username === props.username &&
                <button className="btn" onClick={()=>navigate("/board/edit/"+props.id,{state:{props}})}>수정</button>

            }
            <NavLink to="/board">
                <button className="btn">목록</button>
            </NavLink>
            </div>
        </div>


    );
};


export default Board;