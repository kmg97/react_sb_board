package com.board.service;

import com.board.domain.Board;
import com.board.domain.FileEntity;
import com.board.dto.file.FileRequest;
import com.board.dto.file.FileResponse;
import com.board.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;
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
                .map(fileRequest -> FileEntity.of(fileRequest, board))
                .collect(Collectors.toList());

        fileRepository.saveAll(fileEntities);
    }

    @Transactional(readOnly = true)
    public FileResponse findFileById(Long id) {
        Optional<FileEntity> fileOptional = fileRepository.findById(id);

        if (fileOptional.isPresent()) {
            FileEntity fileEntity = fileOptional.get();
            return FileResponse.fromFileEntity(fileEntity);
        } else {
            return null;
        }
    }

    @Transactional
    public void deleteIds(List<Long> ids) {
        fileRepository.deleteAllById(ids);
    }

    @Transactional(readOnly = true)
    public List<FileResponse> findAllFileByIds(List<Long> ids) {
        List<FileEntity> findAllForDelete = fileRepository.findAllById(ids);
        List<FileResponse> deleteFiles = findAllForDelete.stream()
                .map(FileResponse::fromFileEntity).toList();
        return deleteFiles;
    }

    public List<FileResponse> findAllFileByBoardId(Long boardId){
        List<FileEntity> allByBoardId = fileRepository.findAllByBoardId(boardId);
        System.out.println(allByBoardId.isEmpty());
        if(!allByBoardId.isEmpty()){
            System.out.println("호출됨");
            return allByBoardId.stream().map(FileResponse::fromFileEntity).toList();
        }
        return null;
    }
}
