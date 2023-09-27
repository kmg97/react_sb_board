package com.board.service;

import com.board.domain.Board;
import com.board.dto.BoardPageResponse;
import com.board.dto.BoardRequest;
import com.board.dto.BoardResponseDTO;
import com.board.dto.CommentDTO;
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


    // 제목으로 검색
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
    public Optional<BoardResponseDTO> findDTOById(Long id) {
        Optional<Board> boardOptional = boardRepository.findWithCommentById(id);
        return boardOptional.map(this::mapBoardToDTO);
    }

    private BoardResponseDTO mapBoardToDTO(Board board) {
        BoardResponseDTO dto = new BoardResponseDTO();
        dto.setId(board.getId());
        dto.setUsername(board.getUsername());
        dto.setTitle(board.getTitle());
        dto.setText(board.getText());
        dto.setCreateAt(board.getCreateAt());

        // 댓글 정보를 매핑
        List<CommentDTO> commentDTOList = board.getComments().stream()
                .map(comment -> {
                    CommentDTO commentDTO = new CommentDTO();
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
