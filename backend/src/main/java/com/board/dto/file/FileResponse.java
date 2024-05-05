package com.board.dto.file;

import com.board.domain.FileEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FileResponse {

    private Long id;                      // 파일 번호 (PK)
    private Long boardId;                 // 게시글 번호 (FK)
    private String originalName;          // 원본 파일명
    private String saveName;              // 저장 파일명
    private long size;                    // 파일 크기
    private LocalDateTime createdDate;    // 생성일시
    private LocalDateTime modifiedDate;   // 수정일시

    public static FileResponse fromFileEntity (FileEntity fileEntity) {

        FileResponse fileResponse = new FileResponse();

        fileResponse.setId(fileEntity.getId());
        fileResponse.setBoardId(fileEntity.getBoard().getId());
        fileResponse.setOriginalName(fileEntity.getOriginalName());
        fileResponse.setSaveName(fileEntity.getSaveName());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setCreatedDate(fileEntity.getCreatedAt());
        fileResponse.setModifiedDate(fileEntity.getModifiedAt());

        return fileResponse;
    }
}
