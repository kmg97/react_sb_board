import React, { useState } from 'react';
import './BoardDetail.css';
import { useAuth } from '../../../context/AuthProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';

const BoardDetail = (props) => {
    const navigate = useNavigate();
    const [comments, setComments] = useState(props.comments || []);

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
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    window.location.reload();
                })
                .catch(error => {
                    console.error('API 호출 오류:', error);
                });
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
            <p className="detail-time">작성시간 : {props.createAt}</p>
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