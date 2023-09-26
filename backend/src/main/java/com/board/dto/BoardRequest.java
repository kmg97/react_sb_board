package com.board.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BoardRequest {
    private String username;
    private String title;
    private String text;
    private Date createAt;
}
