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
    const deleteHandler = (boardId) => {
        if (props.userInfo && props.userInfo.token != null) {
            const confirm = window.confirm("삭제하시겠습니까?");
            if (confirm) {
                fetch(`/api/board/posts/${boardId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + props.userInfo.token
                    }
                })
                    .then(response => {
                        if (response.status === 401) {
                            throw new Error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                        }
                        if (response.status === 403) {
                            throw new Error("접근 권한이 없습니다.");
                        }
                        alert("삭제되었습니다.")
                        navigate("/board/posts");
                    })
                    .catch(error => {
                        alert(error.message);
                    })
            }
        } else {
            alert("로그인 후 이용해주세요");
            navigate("/login");
        }
    };

    const handleCommentSubmit = (newComment) => {
        if (props.userInfo && props.userInfo.token != null) {

            fetch(`/api/comment`, {
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


    const downloadFile = (boardId, fileId, originalName) => {
        console.log("파일 다운로드 요청")
        const url = `/api/board/files/${fileId}/download`; // API 엔드포인트의 절대 경로

        fetch(url, {
            method: 'GET', // GET 요청
            headers: {
                "Authorization": "Bearer " + props.userInfo.token, // 토큰을 헤더에 추가
            },
        })
            .then((response) => {
                // 파일 다운로드 로직
                return response.blob(); // 응답 데이터를 Blob 형태로 변환
            })
            .then((blob) => {
                // Blob을 사용하여 파일 다운로드
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = originalName; // 다운로드될 파일명 설정
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                // 오류 처리
                console.error('파일 다운로드 실패:', error);
            });
    };
    return (
        <div className="detail-info-card">
            <h2 className="detail-name">제목 : {props.title}</h2>
            <hr />
            <p className="detail-name">작성자 : {props.username}</p>
            <hr />
            <p className="detail-time">작성시간 : {formatDateTime(props.createdAt)}</p>
            <p className="detail-time">수정 : {formatDateTime(props.modifiedAt)}</p>
            {/* 첨부 파일 목록 */}
            <div className="file-list">
                {props.files.length!==0&&
                    <>
                        <p style={{ fontSize: '18px', fontWeight: 'bold', color:'black' }}>첨부 파일:</p>
                        <ul style={{ listStyleType: 'none', padding: '0' }}>
                            {props.files.map((file) => (
                                <li key={file.id} style={{ marginBottom: '5px' }}>
                                    <a
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            textDecoration: 'underline',
                                            cursor: 'pointer', color:'black'
                                        }}
                                        onClick={() => downloadFile(props.id, file.id, file.originalName)}
                                    >
                                        {file.originalName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </>
            }
            </div>
            <p className="detail-text">글 본문 : {props.content}</p>

            {/* 댓글 입력 폼 */}
            <CommentSection
                user={props.userInfo} // 로그인한 유저 정보
                boardId={props.id} // 게시글 id
                onCommentSubmit={handleCommentSubmit}
                comments={comments} // 기존 댓글 전달
            />

            <div className="two-btn">
                {props.userInfo !== null && props.userInfo.username === props.username && (
                    <div>
                    <button
                        className="btn"
                        onClick={() => navigate(`/board/edit/${props.id}`, { state: { props } })}
                    >
                        수정
                    </button>
                    <button className="btn" onClick={()=>deleteHandler(props.id)}>삭제</button>
                    </div>
                )}
                <NavLink to="/board/posts">
                    <button className="btn">목록</button>
                </NavLink>
            </div>
        </div>
    );
};

export default BoardDetail;
