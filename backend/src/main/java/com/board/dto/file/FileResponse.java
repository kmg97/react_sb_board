package com.board.dto.file;

import com.board.domain.FileEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class FileResponse {

    private Long id;                      // 파일 번호 (PK)
    private Long boardId;                 // 게시글 번호 (FK)
    private String originalName;          // 원본 파일명
    private String saveName;              // 저장 파일명
    private long size;                    // 파일 크기
    private LocalDateTime createdDate;    // 생성일시
    private LocalDateTime modifiedDate;   // 수정일시

    public static FileResponse from (FileEntity fileEntity) {

        return builder()
                .id(fileEntity.getId())
                .boardId(fileEntity.getBoard().getId())
                .originalName(fileEntity.getOriginalName())
                .saveName(fileEntity.getSaveName())
                .size(fileEntity.getSize())
                .createdDate(fileEntity.getCreatedAt())
                .modifiedDate(fileEntity.getModifiedAt())
                .build();
    }
}
