package com.board.dto;

import com.board.domain.Authority;
import com.board.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignResponse {
    private Long userId;
    private String username;
    private String password;
    private String fullname;
    private String street;
    private String city;
    private String phoneNumber;
    private String email;

    private List<Authority> roles = new ArrayList<>();

    private String token;

    public SignResponse(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.fullname = user.getFullname();
        this.street = user.getStreet();
        this.city = user.getCity();
        this.phoneNumber = user.getPhoneNumber();
        this.email = user.getEmail();
        this.roles = user.getRoles();
    }
}
