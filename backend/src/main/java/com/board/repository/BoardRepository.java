package com.board.repository;

import com.board.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b JOIN FETCH b.user WHERE b.title LIKE %:title% ORDER BY b.id ASC")
    Page<Board> findByTitleContaining(@Param("title") String title, Pageable pageable);

    // 엔티티들은 서로 연관되어 있는 관계가 보통이며 이 관계는 그래프로 표현이 가능하다.
    // EntityGraph는 JPA가 어떤 엔티티를 불러올 때 이 엔티티와 관계된 엔티티를 불러올 것인지에 대한 정보를 제공한다.
    // https://frogand.tistory.com/151
    // @EntityGraph(attributePaths = {"comments"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("SELECT b FROM Board b JOIN FETCH b.user LEFT JOIN FETCH b.comments c LEFT JOIN FETCH c.user  WHERE b.id = :boardId")
    Optional<Board> findWithCommentById(@Param("boardId") Long boardId);

}
