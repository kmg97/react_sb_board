package com.board.dto;

import com.board.domain.Board;
import lombok.Getter;

import java.util.List;

@Getter
public class BoardPageResponse {
    private List<Board> boards;
    private long totalSize;

    public BoardPageResponse(List<Board> boards, long totalSize) {
        this.boards = boards;
        this.totalSize = totalSize;
    }

}
