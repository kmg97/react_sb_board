package com.board.error;

import lombok.Getter;

@Getter
public class ErrorObject {
    private final String fieldName;
    private final String message;

    public ErrorObject(String fieldName, String message) {
        this.fieldName = fieldName;
        this.message = message;
    }
}