package com.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponse {
    private Long id;
    private String username;
    private String title;
    private String text;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentResponse> comments;
    private List<FileResponse> files;
}