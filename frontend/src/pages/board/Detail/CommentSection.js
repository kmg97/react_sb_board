import React, {useState} from 'react';
import "./CommentSection.css";

const CommentSection = ({ user, boardId, onCommentSubmit, comments }) => {
    const [comment, setComment] = useState('');
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
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>작성자: {comment.username}</p>
                            <p>{comment.comments}</p>
                            <p className="comment-time">작성 시간: {formatDateTime(comment.createdAt)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;