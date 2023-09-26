package com.board.service;

import com.board.domain.Board;
import com.board.dto.BoardPageResponse;
import com.board.dto.BoardRequest;
import com.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardPageResponse findByTitle(String title, int startIdx, int size) {
        PageRequest pageable = PageRequest.of(startIdx, size);
        Page<Board> result = boardRepository.findByTitleContaining(title, pageable);
        List<Board> boards = result.getContent(); // 현재 페이지의 게시물 리스트
        long totalSize = result.getTotalElements();
        return new BoardPageResponse(boards, totalSize);
    }

    public Optional<Board> findById(Long id) {
        return boardRepository.findById(id);
    }

    public boolean register(BoardRequest request) throws Exception {
        try {
            Board board = Board.builder()
                    .username(request.getUsername())
                    .title(request.getTitle())
                    .createAt(request.getCreateAt())
                    .text(request.getText())
                    .build();

            boardRepository.save(board);
        } catch (Exception e) {
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }

//    public boolean updatePost(BoardRequest request) throws Exception {
//        try {
//
//            Board.builder()
//        } catch (Exception e) {
//
//        }
//
//        return true;
//    }
}
