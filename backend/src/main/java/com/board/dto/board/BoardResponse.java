package com.board.dto.board;

import com.board.domain.Board;
import com.board.dto.comment.CommentResponse;
import com.board.dto.file.FileResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

// 게시글 조회 후 보낼 객체
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponse {
    private Long id;
    private String username;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private List<CommentResponse> comments;
    private List<FileResponse> files;

    public static BoardResponse fromBoard(Board board) {
        BoardResponse response = new BoardResponse();

        response.id = board.getId();
        response.username = board.getUser().getUsername();
        response.title =  board.getTitle();
        response.content = board.getContent();
        response.createdAt = board.getCreatedAt();
        response.modifiedAt = board.getModifiedAt();

        return response;
    }
}