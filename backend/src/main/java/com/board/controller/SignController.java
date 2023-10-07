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
public class SignController {

    private final SignService memberService;

    @PostMapping(value = "/login")
    public ResponseEntity<SignResponse> signin(@RequestBody SignRequest request) throws Exception {
        return new ResponseEntity<>(memberService.login(request), HttpStatus.OK);
    }

    // 유효성 검사후 실패시 실패한 필드와 조건 반환
    @PostMapping(value = "/register")
    public ResponseEntity<?> signup(@Valid @RequestBody SignRequest request) throws Exception {
        System.out.println(request.toString());
        return new ResponseEntity<>(memberService.register(request), HttpStatus.OK);
    }

    // 아이디 중복 확인 - 존재시 true 반환
    @GetMapping("/register/{username}/exists")
    public ResponseEntity<Boolean> checkUsernameDuplicate(@PathVariable String username){
        return ResponseEntity.ok(memberService.checkUsernameDuplication(username));
    }

    @GetMapping(value="/user/get")
    public ResponseEntity<SignResponse> getUser(@RequestParam String username) throws Exception {
        return new ResponseEntity<>( memberService.getMember(username), HttpStatus.OK);
    }

    @GetMapping("/admin/get")
    public ResponseEntity<SignResponse> getUserForAdmin(@RequestParam String account) throws Exception {
        return new ResponseEntity<>( memberService.getMember(account), HttpStatus.OK);
    }
}
