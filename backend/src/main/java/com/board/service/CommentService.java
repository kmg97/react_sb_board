package com.board.service;

import com.board.domain.Board;
import com.board.domain.Comment;
import com.board.domain.User;
import com.board.dto.CommentRequest;
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
            // 유저 조회
            User user = userRepository.findById(commentRequest.getUserId()).get();
            // 게시글 조회
            Board board = boardRepository.findById(commentRequest.getBoardId()).get();
            Comment comment = Comment.builder()
                        .user(user)
                        .board(board)
                        .comments(commentRequest.getComments())
                        .createAt(commentRequest.getCreateAt())
                        .build();
            commentRepository.save(comment);
        } catch (Exception e){
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }


    
    
}
