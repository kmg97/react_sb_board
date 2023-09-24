package com.board.service;

import com.board.domain.Board;
import com.board.dto.BoardRequest;
import com.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    public Optional<Board> findById(Long id) {
        return boardRepository.findById(id);
    }

    public boolean register(BoardRequest request) throws Exception {
        try {
            Board board = Board.builder()
                    .username(request.getUsername())
                    .title(request.getTitle())
                    .time(request.getTime())
                    .text(request.getText())
                    .build();

            boardRepository.save(board);
        } catch (Exception e) {
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }
}
