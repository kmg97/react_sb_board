package com.board.domain;

import com.board.dto.sign.SignRequest;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = false)
  private  String username;
  @Column(nullable = false)
  private  String password;
  @Column(nullable = false)
  private  String fullname;
  @Column(nullable = false)
  private  String street;
  @Column(nullable = false)
  private String city;
  @Column(nullable = false)
  private  String phoneNumber;
  @Column(nullable = false)
  private  String email;


  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Board> boards; // 사용자가 작성한 게시글 목록

  /* FetchType fetch() default FetchType.LAZY; */
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  @Builder.Default
  private List<Authority> roles = new ArrayList<>();

  public void setRoles(List<Authority> role) {
    this.roles = role;
    role.forEach(o -> o.setUser(this));
  }

  public static User toSingRequest (SignRequest request, String encPw) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(encPw);
    user.setFullname(request.getFullname());
    user.setStreet(request.getStreet());
    user.setCity(request.getCity());
    user.setPhoneNumber(request.getPhoneNumber());
    user.setEmail(request.getEmail());
    return user;
  }

}
