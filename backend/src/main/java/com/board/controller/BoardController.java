package com.board.controller;

import com.board.domain.Board;
import com.board.dto.BoardPageResponse;
import com.board.dto.BoardRequest;
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

    @PostMapping
    public ResponseEntity<Boolean> board(@RequestBody BoardRequest boardRequest) throws Exception {
        return new ResponseEntity<>(boardService.register(boardRequest), HttpStatus.OK);
    }

    /* 검색 조건 현재 Like 사용. 변경 필요. */
    @GetMapping("/list")
    public ResponseEntity<BoardPageResponse> titleSearch(@RequestParam(value = "title", defaultValue = "") String title, @RequestParam ("page") int startIdx, @RequestParam ("pageSize") int size){
        BoardPageResponse boardPageResponse = boardService.findByTitle(title, startIdx, size);
        return new ResponseEntity<>(boardPageResponse, HttpStatus.OK);
    }

//    @GetMapping("/list")
//    public ResponseEntity<BoardPageResponse> getBoard(@RequestParam ("page") int startIdx, @RequestParam ("pageSize") int size) {
//        BoardPageResponse pageResult = boardService.findAll(startIdx, size);
//        return new ResponseEntity<>(pageResult, HttpStatus.OK);
//    }

    @GetMapping("/list/{id}")
    public ResponseEntity<Board> getDetail(@PathVariable Long id) {
        Optional<Board> board = boardService.findById(id);
        return board.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));

    }

}
