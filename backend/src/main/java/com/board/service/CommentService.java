package com.board.service;

import com.board.domain.Board;
import com.board.domain.Comment;
import com.board.domain.User;
import com.board.dto.comment.CommentRequest;
import com.board.repository.BoardRepository;
import com.board.repository.CommentRepository;
import com.board.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    // 댓글 등록
    public boolean register(CommentRequest commentRequest) throws Exception {
        try {
            // 댓글 작성자(유저) 조회
            User user = userRepository.findById(commentRequest.getUserId()).orElseThrow(()->new Exception("로그인 후 이용해주세요."));
            // 게시글 조회
            Board board = boardRepository.findById(commentRequest.getBoardId()).orElseThrow(()->new Exception("존재하지 않는 게시글입니다."));
            Comment comment = Comment.builder()
                        .user(user)
                        .board(board)
                        .comments(commentRequest.getComments())
                        .build();
            commentRepository.save(comment);
        } catch (Exception e){
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }

    public boolean commentUpdate(Long id,CommentRequest commentRequest) {
        Optional<Comment> findComment = commentRepository.findById(id);
        if(findComment.isPresent()) {
            Comment comment = findComment.get();
            comment.setComments(commentRequest.getComments());
            commentRepository.save(comment);
        } else {
            return false;
        }
        return true;
    }

    public boolean commentDelete(Long id){
        commentRepository.deleteById(id);
        return true;
    }

}
