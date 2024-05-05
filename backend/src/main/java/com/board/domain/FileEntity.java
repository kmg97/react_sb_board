package com.board.domain;

import com.board.dto.file.FileRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "FILE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FILE_ID")
    private Long id;

    @Column(name = "original_name", nullable = false)
    private String originalName;

    @Column(name = "save_name", nullable = false)
    private String saveName;

    @Column(name = "size", nullable = false)
    private Long size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    public static FileEntity of (FileRequest fileRequest, Board board) {
        FileEntity file = new FileEntity();

        file.setOriginalName(fileRequest.getOriginalName());
        file.setSaveName(fileRequest.getSaveName());
        file.setSize(fileRequest.getSize());
        file.setBoard(board);

        return file;
    }
}
