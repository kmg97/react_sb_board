package com.board.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private Long id;
    private String username;
    private String comments;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
