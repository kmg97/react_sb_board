package com.board.repository;

import com.board.domain.Board;
import jakarta.persistence.QueryHint;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, JpaSpecificationExecutor<Board> {
    @QueryHints(value = @QueryHint(name = org.hibernate.jpa.QueryHints.HINT_FETCH_SIZE, value = "1"))
    Page<Board> findAll(Specification<Board> spec, Pageable pageable);

    // 엔티티들은 서로 연관되어 있는 관계가 보통이며 이 관계는 그래프로 표현이 가능하다.
    // EntityGraph는 JPA가 어떤 엔티티를 불러올 때 이 엔티티와 관계된 엔티티를 불러올 것인지에 대한 정보를 제공한다.
    // https://frogand.tistory.com/151
    // @EntityGraph(attributePaths = {"comments"}, type = EntityGraph.EntityGraphType.LOAD)
    @Query("SELECT b FROM Board b JOIN FETCH b.user LEFT JOIN FETCH b.comments c LEFT JOIN FETCH c.user  WHERE b.id = :boardId")
    Optional<Board> findWithCommentById(@Param("boardId") Long boardId);
}
