package com.board.service;

import com.board.domain.Board;
import com.board.dto.BoardPageResponse;
import com.board.dto.BoardRequest;
import com.board.dto.BoardResponse;
import com.board.dto.CommentResponse;
import com.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;


    
    // 게시글 등록
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

    // 게시글 업데이트
    public boolean update(Long id, BoardRequest request) throws Exception {
        try {
            Optional<Board> optionalBoard = boardRepository.findById(id);
            if (optionalBoard.isPresent()) {
                Board board = optionalBoard.get();
                board.setUsername(request.getUsername());
                board.setTitle(request.getTitle());
                board.setText(request.getText());

                boardRepository.save(board); // 엔터티를 저장하여 업데이트 반영
            } else {
                throw new Exception("게시글을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }


    // 제목으로 검색
    @Transactional(readOnly = true)
    public BoardPageResponse findByTitle(String title, int startIdx, int size) {
        PageRequest pageable = PageRequest.of(startIdx, size);
        Page<Board> result = boardRepository.findByTitleContaining(title, pageable);
        List<Board> boards = result.getContent(); // 현재 페이지의 게시물 리스트
        long totalSize = result.getTotalElements();
        return new BoardPageResponse(boards, totalSize);
    }

    /* 사용 안함 */
    public Optional<Board> findById(Long id) {
        return boardRepository.findById(id);
    }

    // 게시글 상세 조회시 게시글과 댓글 함께 조회
    @Transactional(readOnly = true)
    public Optional<BoardResponse> getBoardDetail(Long id) {
        Optional<Board> boardOptional = boardRepository.findWithCommentById(id);
        return boardOptional.map(this::getBoardDetailDto);
    }

    private BoardResponse getBoardDetailDto(Board board) {
        BoardResponse dto = new BoardResponse();
        dto.setId(board.getId());
        dto.setUsername(board.getUsername());
        dto.setTitle(board.getTitle());
        dto.setText(board.getText());
        dto.setCreateAt(board.getCreateAt());

        // 댓글 정보를 매핑
        List<CommentResponse> commentDTOList = board.getComments().stream()
                .map(comment -> {
                    CommentResponse commentDTO = new CommentResponse();
                    commentDTO.setId(comment.getId());
                    commentDTO.setUsername(comment.getUser().getUsername());
                    commentDTO.setComments(comment.getComments());
                    commentDTO.setCreateAt(comment.getCreateAt());
                    return commentDTO;
                })
                .collect(Collectors.toList());
        dto.setComments(commentDTOList);

        return dto;
    }
}