package com.board.controller;

import com.board.domain.Board;
import com.board.dto.BoardRequest;
import com.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/board/list")
    public ResponseEntity<List<Board>> getBoard() {
        return new ResponseEntity<>(boardService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/board/list/{id}")
    public ResponseEntity<Board> getDetail(@PathVariable Long id) {
        Optional<Board> board = boardService.findById(id);
        if(board.isPresent()){
            return new ResponseEntity<>(board.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

    }

    @PostMapping("/board")
    public ResponseEntity<Boolean> board(@RequestBody BoardRequest boardRequest) throws Exception {
        System.out.println("title : " + boardRequest.getTitle()+" content : " + boardRequest.getText());
        return new ResponseEntity<>(boardService.register(boardRequest), HttpStatus.OK);
    }
}
