package com.board.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class BoardResponseDTO {
    private Long id;
    private String username;
    private String title;
    private String text;
    private Date createAt;
    private List<CommentDTO> comments;

    // 생성자, 게터, 세터 등 필요한 메서드를 추가할 수 있습니다.
}