package com.board.security;

import com.board.domain.User;
import com.board.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/*
* JpaUserDetailsService
Spring Security의 UserDetailsService는 UserDetails 정보를 토대로 유저 정보를 불러올 때 사용된다.

Jpa를 이용하여 DB에서 유저 정보를 조회할 것이므로 이에 맞춰서 구현해주면 된다.
* */
@Service
@RequiredArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

  private final UserRepository memberRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    User user = memberRepository.findByUsername(username).orElseThrow(
            () -> new UsernameNotFoundException("Invalid authentication!")
    );

    return new CustomUserDetails(user);
  }
}

