package com.board.repository;
import com.board.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  // 엔티티들은 서로 연관되어 있는 관계가 보통이며 이 관계는 그래프로 표현이 가능하다.
  // EntityGraph는 JPA가 어떤 엔티티를 불러올 때 이 엔티티와 관계된 엔티티를 불러올 것인지에 대한 정보를 제공한다.
  // https://frogand.tistory.com/151
  // @EntityGraph(attributePaths = {"roles"}, type = EntityGraph.EntityGraphType.LOAD)
  @Query("SELECT u, r FROM User u JOIN FETCH u.roles r WHERE u.username = :username")
  Optional<User> findByUsername(@Param("username") String username);

}
