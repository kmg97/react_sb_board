package com.board.dto.comment;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class CommentRequest {
    // 작성자 id
    private Long userId;
    // 게시글 id
    private Long boardId;

    private String comments;
}
