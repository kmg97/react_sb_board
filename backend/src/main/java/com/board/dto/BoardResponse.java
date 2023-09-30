package com.board.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class BoardResponse {
    private Long id;
    private String username;
    private String title;
    private String text;
    private Date createAt;
    private List<CommentResponse> comments;

}