package com.board.dto.comment;

import com.board.domain.Comment;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private Long id;
    private String username;
    private String comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public static CommentResponse fromComments (Comment comment) {
        CommentResponse response = new CommentResponse();

        response.id = comment.getId();
        response.username = comment.getUser().getUsername();
        response.comments = comment.getComments();
        response.createdAt = comment.getCreatedAt();
        response.modifiedAt = comment.getModifiedAt();

        return response;

    }
}
