package com.board.dto.sign;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignRequest {
    @NotEmpty(message = "아이디를 입력해주세요.")
    private String username;
    @NotEmpty(message = "비밀번호를 입력해주세요")
    @Pattern(regexp="(?=.*[0-9])(?=.*[a-z])(?=.*\\W)(?=\\S+$).{8,20}",
            message = "비밀번호는 영문 소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.")
    private String password;
    @NotEmpty(message = "회원 이름을 입력해주세요")
    private String fullname;
    @NotEmpty(message = "주소를 입력해주세요")
    private String street;
    @NotEmpty(message = "주소를 입력해주세요")
    private String city;
    @NotEmpty(message = "핸드폰 번호를 입력해주세요")
    private String phoneNumber;
    @NotEmpty(message = "이메일을 입력해주세요")
    @Email(message = "이메일 형식이 올바르지 않습니다")
    private String email;
}
