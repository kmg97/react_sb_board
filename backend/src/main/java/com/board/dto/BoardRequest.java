package com.board.dto;

import lombok.Data;

@Data
public class BoardRequest {
    private String username;
    private String title;
    private String text;
}
