package com.board.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentResponse {
    private Long id;
    private String username;
    private String comments;
    private Date createdAt;
    private Date modifiedAt;
    // 생성자, 게터, 세터 등 필요한 메서드를 추가할 수 있습니다.
}
