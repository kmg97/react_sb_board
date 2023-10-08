import React, {useState} from 'react';
import "./CommentSection.css";

const CommentSection = ({ user, boardId, onCommentSubmit, comments }) => {
    const [comment, setComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleCommentSubmit = () => {
        if (comment.trim() !== '') {
            const newComment = {
                boardId,
                userId: user.userid,
                comments: comment,
            };

            onCommentSubmit(newComment);
            setComment('');
        } else {
            alert("댓글 내용을 작성해주세요");
        }
    };

    const handleEditClick = (commentId, initialComment) => {
        setEditingCommentId(commentId);

        // 수정 버튼을 누를 때 해당 댓글의 내용을 불러와서 editComment 상태에 설정
        setEditComment(initialComment);
    };

    const editCancel = () => {
        setEditComment('');
        setEditingCommentId(null);
    }

    const editSubmitHandler = (idx)=>{
        if(editComment.trim()===""){
            alert("댓글 내용을 작성해주세요.");
        }
        const newComment = {
            boardId,
            userId: user.userid,
            comments: editComment,
        };

        if (user && user.token != null) {
            fetch(`http://localhost:8080/api/comment/update/${idx}`, {
                method: "PUT",
                body: JSON.stringify(newComment),
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.status === 304) {
                        throw new Error("댓글을 수정하는데 실패하였습니다.")
                    }
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
        }
        setEditingCommentId('');
        setEditComment("");
    }
    const deleteHandler = (idx)=>{
        if ( user && user.token != null) {
            const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
            if(confirm){
                fetch(`http://localhost:8080/api/comment/delete/${idx}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + user.token,
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
            }
        } else {
            alert("로그인 후 이용해주세요");
        }
    }

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    return (
        <div className="comment-section">
            <h3>댓글</h3>
            <textarea
                rows="4"
                cols="50"
                placeholder="댓글을 입력하세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button className="btn" onClick={handleCommentSubmit}>
                댓글 작성
            </button>
            {/* 댓글 목록 표시 */}
            <div className="comments">
                <h3>댓글 목록</h3>
                {comments.length === 0 ? (
                    <div className="comment">
                        <p>조회된 댓글이 없습니다. 댓글을 작성해보세요.</p>
                    </div>
                ) :(
                    comments.map((commentItem) => (
                        <div key={commentItem.id} className="comment">
                            <p>작성자: {commentItem.username}</p>
                            {editingCommentId === commentItem.id ? (
                                <div>
                                      <textarea
                                          value={editComment}
                                          onChange={(e) => setEditComment(e.target.value)} // 수정된 부분
                                      />
                                    <button className="btn" onClick={e=>editSubmitHandler(commentItem.id)} >
                                        저장
                                    </button>
                                </div>
                            ) : (
                                <p>{commentItem.comments}</p>
                            )}
                            <p className="comment-time">작성 시간: {formatDateTime(commentItem.createdAt)}</p>
                            {user !== null && user.username === commentItem.username && (
                                <div>
                                    {editingCommentId !== commentItem.id ? (
                                        <button className="btn" onClick={e=> handleEditClick(commentItem.id, commentItem.comments)}>
                                            수정
                                        </button>
                                    ) : (
                                        <button className="btn" onClick={e=>editCancel()}>
                                            취소
                                        </button>
                                    )}
                                    <button className="btn" onClick={e=>deleteHandler(commentItem.id)} >
                                        삭제
                                    </button>
                                </div>
                                )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;