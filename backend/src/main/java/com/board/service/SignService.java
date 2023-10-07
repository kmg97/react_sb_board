package com.board.service;

import com.board.domain.Authority;
import com.board.domain.User;
import com.board.dto.sign.SignRequest;
import com.board.dto.sign.SignResponse;
import com.board.repository.UserRepository;
import com.board.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@Transactional
@RequiredArgsConstructor
public class SignService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public SignResponse login(SignRequest request) throws Exception {
        User user = userRepository.findByUsername(request.getUsername()).orElseThrow(() ->
                new BadCredentialsException("잘못된 계정정보입니다."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("잘못된 계정정보입니다.");
        }

        return SignResponse.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles())
                .token(jwtProvider.createToken(user.getUsername(), user.getRoles()))
                .build();
    }

    public boolean register(SignRequest request) throws Exception {
        try {
            User user = User.builder()
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .fullname(request.getFullname())
                    .street(request.getStreet())
                    .city(request.getCity())
                    .phoneNumber(request.getPhoneNumber())
                    .email(request.getEmail())
                    .build();

            user.setRoles(Collections.singletonList(Authority.builder().name("ROLE_USER").build()));

            userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("잘못된 요청입니다.");
        }
        return true;
    }

    public SignResponse getMember(String username) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("계정을 찾을 수 없습니다."));
        return new SignResponse(user);
    }

    // 아이디 중복 체크
    @Transactional(readOnly = true)
    public boolean checkUsernameDuplication(String username) {
        return userRepository.existsByUsername(username);
    }

}
