package com.board.controller;

import com.board.dto.sign.SignRequest;
import com.board.dto.sign.SignResponse;
import com.board.service.SignService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class SignController {

    private final SignService memberService;

    // 회원가입
    @PostMapping(value = "/login")
    public ResponseEntity<SignResponse> signin(@RequestBody SignRequest request) throws Exception {
        return new ResponseEntity<>(memberService.login(request), HttpStatus.OK);
    }

    // 유효성 검사후 실패시 MethodArgumentNotValidException 발생
    // ErrorController 에서 실패한 필드와 조건 가공 후 상태코드 BAD_REQUEST 와 함께 반환
    @PostMapping(value = "/register")
    public ResponseEntity<Boolean> signup(@Valid @RequestBody SignRequest request) throws Exception {
        System.out.println(request.toString());
        return new ResponseEntity<>(memberService.register(request), HttpStatus.OK);
    }

    // 아이디 중복 확인 - 존재시 true 반환
    @GetMapping("/register/{username}/exists")
    public ResponseEntity<Boolean> checkUsernameDuplicate(@PathVariable String username){
        return ResponseEntity.ok(memberService.checkUsernameDuplication(username));
    }
}
