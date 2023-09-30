package com.board.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.IOException;
import java.util.Arrays;

@SuppressWarnings("deprecation")
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

  private final JwtProvider jwtProvider;

  // HttpSecurity, WebSecurity를 원래는 WebSecurityConfigurerAdapter 상속받아 Override 하였지만,
  // Security 6 이후로 Bean을 직접 등록하여 설정하게 바뀌었다.

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
            .httpBasic(basic -> basic.disable())
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable()) // REST API 통신은 CSRF 필요 없다.
            // Spring Security 세션 정책 : 세션을 생성 및 사용하지 않음
            .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeRequests(
                    request ->
                    {
                        request.requestMatchers(HttpMethod.OPTIONS).permitAll()
                                .requestMatchers(HttpMethod.PATCH, "/").permitAll()
                                .requestMatchers("/register", "/login").permitAll()
                                // /admin으로 시작하는 요청은 ADMIN 권한이 있는 유저에게만 허용
                                .requestMatchers("/admin/**").hasRole("ADMIN")
                                // /user 로 시작하는 요청은 USER 권한이 있는 유저에게만 허용
                                .requestMatchers("/user/**","/api/board/**", "/api/comment").hasRole("USER")
                                .anyRequest().denyAll();
                                // JWT 인증 필터 적용
                    })
            .addFilterBefore(new JwtAuthenticationFilter(jwtProvider), UsernamePasswordAuthenticationFilter.class)
            // 에러 핸들링
            .exceptionHandling(ex->ex.accessDeniedHandler(new AccessDeniedHandler() {
                      @Override
                      public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                        // 권한 문제가 발생했을 때 이 부분을 호출한다.
                        response.setStatus(403);
                        response.setCharacterEncoding("utf-8");
                        response.setContentType("text/html; charset=UTF-8");
                        response.getWriter().write("권한이 없는 사용자입니다.");
                      }
                    })
            .authenticationEntryPoint(new AuthenticationEntryPoint() {
                  @Override
                 public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                    // 인증문제가 발생했을 때 이 부분을 호출한다.
                    response.setStatus(401);
                    response.setCharacterEncoding("utf-8");
                    response.setContentType("text/html; charset=UTF-8");
                    response.getWriter().write("인증되지 않은 사용자입니다.");
                 }
               })
            )
            .headers(header->header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin));
    return httpSecurity.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setExposedHeaders(Arrays.asList("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Bean
  public PasswordEncoder encoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }
}
