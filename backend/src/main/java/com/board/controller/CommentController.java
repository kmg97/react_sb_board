package com.board.controller;

import com.board.dto.comment.CommentRequest;
import com.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    
    // 댓글 삭제
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Boolean> commentDelete(@PathVariable Long id) throws Exception {
        return new ResponseEntity<>(commentService.commentDelete(id), HttpStatus.OK);
    }


    // 댓글 수정
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Boolean> commentUpdate(@PathVariable Long id ,@RequestBody CommentRequest commentRequest) throws Exception {
        System.out.println(commentRequest.toString());
        boolean result = commentService.commentUpdate(id, commentRequest);
        if(result) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

}
