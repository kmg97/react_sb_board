package com.board.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
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

  @OneToMany(mappedBy = "member", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @Builder.Default
  private List<Authority> roles = new ArrayList<>();

  public void setRoles(List<Authority> role) {
    this.roles = role;
    role.forEach(o -> o.setMember(this));
  }

}
