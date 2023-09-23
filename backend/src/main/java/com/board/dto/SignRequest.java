package com.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignRequest {

    private String username;
    private String password;
    private String fullname;
    private String street;
    private String city;
    private String phoneNumber;
    private String email;

}
