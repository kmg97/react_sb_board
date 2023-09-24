import React from 'react';
import "./DetailInfoCard.css"; // 스타일링을 위한 CSS 파일을 가져옵니다.

const Board = (props) => {

    return (
        <div className="detail-info-card">
            <h2 className="detail-name">제목 : {props.title}</h2>
            <p className="detail-name">작성자 : {props.username}</p>
            <p className="detail-time">작성시간 : {props.time}</p>
            <p className="detail-text">글 본문 : {props.text}</p>
        </div>
    );
};


export default Board;