package com.board.service;

import com.board.domain.Board;
import com.board.domain.User;
import com.board.dto.board.BoardPageResponse;
import com.board.dto.board.BoardRequest;
import com.board.dto.board.BoardResponse;
import com.board.dto.comment.CommentResponse;
import com.board.dto.file.FileResponse;
import com.board.repository.BoardRepository;
import com.board.repository.FileRepository;
import com.board.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
        Board board = null;
        User user = userRepository.findByUsername(request.getUsername()).get();
        try {
                board = Board.builder()
                        .user(user)
                        .title(request.getTitle())
                        .content(request.getContent())
                        .build();

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
            Optional<Board> optionalBoard = boardRepository.findById(id);
            Optional<User> user = userRepository.findByUsername(request.getUsername());
            if (optionalBoard.isPresent()&&user.isPresent()) {
                Board board = optionalBoard.get();
                board.setUser(user.get());
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

    // 제목으로 검색
    @Transactional(readOnly = true)
    public BoardPageResponse findByTitle(String title, int startIdx, int size) {
        PageRequest pageable = PageRequest.of(startIdx, size);
        Page<Board> result = boardRepository.findByTitleContaining(title, pageable);
        List<BoardResponse> boards = result.getContent()
                .stream()
                .map(board->{
                    BoardResponse boardResponse =  BoardResponse.builder()
                             .id(board.getId())
                             .username(board.getUser().getUsername())
                             .title(board.getTitle())
                             .content(board.getContent())
                             .createdAt(board.getCreatedAt())
                             .modifiedAt(board.getModifiedAt()).build();
                    return boardResponse;
                })
                .collect(Collectors.toList()); // 현재 페이지의 게시물 리스트
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
        BoardResponse dto = new BoardResponse();
        dto.setId(board.getId());
        dto.setUsername(board.getUser().getUsername());
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setCreatedAt(board.getCreatedAt());
        dto.setModifiedAt(board.getModifiedAt());

        // 댓글 정보를 매핑
        List<CommentResponse> commentDTOList = board.getComments().stream()
                .map(comment -> {
                    CommentResponse commentDTO = new CommentResponse();
                    commentDTO.setId(comment.getId());
                    commentDTO.setUsername(comment.getUser().getUsername());
                    commentDTO.setComments(comment.getComments());
                    commentDTO.setCreatedAt(comment.getCreatedAt());
                    commentDTO.setModifiedAt(comment.getModifiedAt());
                    return commentDTO;
                })
                .collect(Collectors.toList());
        dto.setComments(commentDTOList);

        // 파일 정보를 매핑
        List<FileResponse> fileDTOList = board.getFileEntity().stream()
                .map(file -> {
                    FileResponse fileDTO = new FileResponse();
                    fileDTO.setId(file.getId());
                    fileDTO.setBoardId(file.getBoard().getId());
                    fileDTO.setOriginalName(file.getOriginalName());
                    fileDTO.setSaveName(file.getSaveName());
                    fileDTO.setSize(file.getSize());
                    fileDTO.setCreatedDate(file.getCreatedAt());
                    fileDTO.setModifiedDate(file.getModifiedAt());
                    return fileDTO;
                })
                .collect(Collectors.toList());
        dto.setFiles(fileDTOList);

        return dto;
    }
}
