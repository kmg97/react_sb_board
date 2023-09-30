package com.board.domain;

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

  @Column(unique = true)
  private  String username;
  private  String password;
  private  String fullname;
  private  String street;
  private String city;
  private  String phoneNumber;
  private  String email;

  /* FetchType fetch() default FetchType.LAZY; */
  @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
  @Builder.Default
  private List<Authority> roles = new ArrayList<>();

  public void setRoles(List<Authority> role) {
    this.roles = role;
    role.forEach(o -> o.setMember(this));
  }

}
