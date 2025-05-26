package com.board.service;

import com.board.domain.Board;
import com.board.domain.Comment;
import com.board.utils.BoardSpecifications;
import com.board.domain.User;
import com.board.dto.board.BoardPageResponse;
import com.board.dto.board.BoardRequest;
import com.board.dto.board.BoardResponse;
import com.board.dto.comment.CommentResponse;
import com.board.dto.file.FileResponse;
import com.board.repository.BoardRepository;
import com.board.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
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
    private final UserRepository userRepository;

    // 게시글 등록
    public Board register(BoardRequest request) throws Exception {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(()-> new Exception("로그인 후 이용해주세요."));

        Board board = Board.from(user, request);
        try {
                board = boardRepository.save(board);
        } catch (Exception e) {
            throw new Exception("잘못된 요청입니다.");
        }
        return board;
    }

    // 게시글 업데이트
    public Board update(Long id, BoardRequest request) throws Exception {
        Board saveBoard=null;
        try {
            // 업데이트 할 글 조회
            Optional<Board> optionalBoard = boardRepository.findById(id);
            if (optionalBoard.isPresent()) {
                Board board = optionalBoard.get();
                board.setTitle(request.getTitle());
                board.setContent(request.getContent());

                saveBoard = boardRepository.save(board);// 엔터티를 저장하여 업데이트 반영
            } else {
                throw new Exception("게시글을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            throw new Exception("잘못된 요청입니다.");
        }
        return saveBoard;
    }

    // 게시물 삭제
    public void delete(Long boardId){
        boardRepository.deleteById(boardId);
    }

    @Transactional(readOnly = true)
    public BoardPageResponse search(String searchType, String searchKeyword, int startIdx, int size) {
        PageRequest pageable = PageRequest.of(startIdx, size);
        Specification<Board> spec = BoardSpecifications.createSpecification(searchType, searchKeyword);
        Page<Board> result = boardRepository.findAll(spec, pageable);

        List<BoardResponse> boards = result.getContent()
                .stream()
                .map(BoardResponse::from)
                .collect(Collectors.toList());

        long totalSize = result.getTotalElements();
        return new BoardPageResponse(boards, totalSize);
    }

    // 게시글 상세 조회시 게시글과 댓글 함께 조회
    @Transactional(readOnly = true)
    public Optional<BoardResponse> getBoardDetail(Long id) {
        Optional<Board> boardOptional = boardRepository.findWithCommentById(id);
        return boardOptional.map(this::getBoardDetailDto);
    }

    private BoardResponse getBoardDetailDto(Board board) {
        BoardResponse dto = BoardResponse.from(board);

        // 댓글 정보를 매핑
        List<CommentResponse> commentDTOList = board.getComments().stream()
                .map(CommentResponse::from)
                .collect(Collectors.toList());
        dto.setComments(commentDTOList);

        // 파일 정보를 매핑
        List<FileResponse> fileDTOList = board.getFileEntity().stream()
                .map(FileResponse::from)
                .collect(Collectors.toList());
        dto.setFiles(fileDTOList);

        return dto;
    }
}
