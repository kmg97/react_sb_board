package com.board.controller;

import com.board.domain.Board;
import com.board.dto.CommentRequest;
import com.board.repository.BoardRepository;
import com.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    // 댓글 등록
    @PostMapping
    public ResponseEntity<Boolean> board(@RequestBody CommentRequest commentRequest) throws Exception {
        System.out.println(commentRequest.toString());
        return new ResponseEntity<>(commentService.register(commentRequest), HttpStatus.OK);
    }

}
