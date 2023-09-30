package com.board.controller;

import com.board.dto.BoardPageResponse;
import com.board.dto.BoardRequest;
import com.board.dto.BoardResponse;
import com.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/*
1.  - 처음 게시글 전체 요청 할 때 시작 인덱스 0, 페이지당 게시글 개수 N 요청후
	- JPA 내 전체 COUNT 호출 후 결과값과 함께 0,1,2,...,N개 게시글 리턴
	-> 현재 /board/list 접근시 findAll 호출
	-> 인자로 pageable 넣게 적절히 변환 필요
* */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    /* 게시물 전체 조회
    검색 조건 현재 Like 사용. 변경 필요. */
    @GetMapping("/list")
    public ResponseEntity<BoardPageResponse> titleSearch(@RequestParam(value = "title", defaultValue = "") String title, @RequestParam ("page") int startIdx, @RequestParam ("pageSize") int size){
        BoardPageResponse boardPageResponse = boardService.findByTitle(title, startIdx, size);
        return new ResponseEntity<>(boardPageResponse, HttpStatus.OK);
    }

    /* 게시물 id를 기준으로 상세 조회 -> 게시물과 댓글 함께 조회 */
    @GetMapping("/list/{id}")
    public ResponseEntity<BoardResponse> getDetail(@PathVariable Long id) {
        Optional<BoardResponse> boardDTO = boardService.getBoardDetail(id);
        return boardDTO.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    /* 게시물 등록 */
    @PostMapping
    public ResponseEntity<Boolean> board(@RequestBody BoardRequest boardRequest) throws Exception {
        return new ResponseEntity<>(boardService.register(boardRequest), HttpStatus.OK);
    }

    // 게시글 업데이트 엔드포인트 추가
    @PutMapping("/edit/{id}")
    public ResponseEntity<Boolean> updateBoard(@PathVariable Long id, @RequestBody BoardRequest boardRequest) throws Exception {
        boolean isUpdated = boardService.update(id, boardRequest);
        if (isUpdated) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }

}
