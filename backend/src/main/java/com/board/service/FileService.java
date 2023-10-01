package com.board.service;

import com.board.domain.Board;
import com.board.domain.FileEntity;
import com.board.dto.FileRequest;
import com.board.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;

    @Transactional
    public void saveFiles(Board board, List<FileRequest> files) {
        if (CollectionUtils.isEmpty(files)) {
            return;
        }

        List<FileEntity> fileEntities = files.stream()
                .map(fileRequest -> {
                    FileEntity fileEntity = new FileEntity();
                    fileEntity.setOriginalName(fileRequest.getOriginalName());
                    fileEntity.setSaveName(fileRequest.getSaveName());
                    fileEntity.setSize(fileRequest.getSize());
                    fileEntity.setBoard(board);
                    return fileEntity;
                })
                .collect(Collectors.toList());

        fileRepository.saveAll(fileEntities);
    }


}
