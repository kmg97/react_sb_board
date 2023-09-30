import React, { useState } from 'react';
import './BoardDetail.css';
import { NavLink, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';

const BoardDetail = (props) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState(props.comments || []);

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    // useLoginCheck();
    const handleCommentSubmit = (newComment) => {
        if (props.userInfo && props.userInfo.token != null) {

            fetch(`http://localhost:8080/api/comment`, {
                method: "POST",
                body: JSON.stringify(newComment),
                headers: {
                    "Authorization": "Bearer " + props.userInfo.token,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                    }
                    if (response.status === 403) {
                        throw new Error("접근 권한이 없습니다.");
                    }
                    console.log(response);
                    window.location.reload();
                })
                .catch(error=>{
                    alert(error.message);
                })
        } else {
            alert("로그인 후 이용해주세요");
            navigate("/login");
        }
    };

    return (
        <div className="detail-info-card">
            <h2 className="detail-name">제목 : {props.title}</h2>
            <hr />
            <p className="detail-name">작성자 : {props.username}</p>
            <hr />
            <p className="detail-time">작성시간 : {formatDateTime(props.createAt)}</p>
            <p className="detail-text">글 본문 : {props.text}</p>

            {/* 댓글 입력 폼 */}
            <CommentSection
                user={props.userInfo} // 로그인한 유저 정보
                boardId={props.id} // 게시글 id
                onCommentSubmit={handleCommentSubmit}
                comments={comments} // 기존 댓글 전달
            />

            <div className="two-btn">
                {props.userInfo !== null && props.userInfo.username === props.username && (
                    <button
                        className="btn"
                        onClick={() => navigate(`/board/edit/${props.id}`, { state: { props } })}
                    >
                        수정
                    </button>
                )}
                <NavLink to="/board/list">
                    <button className="btn">목록</button>
                </NavLink>
            </div>
        </div>
    );
};

export default BoardDetail;