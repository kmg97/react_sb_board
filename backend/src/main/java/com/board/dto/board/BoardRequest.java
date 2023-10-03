package com.board.dto.board;

import lombok.Data;

@Data
public class BoardRequest {
    private String username;
    private String title;
    private String content;
}
