package com.board.utils;

import com.board.domain.Board;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class BoardSpecifications {

    public static Specification<Board> titleContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if(Board.class.equals(query.getResultType())) {
                root.fetch("user", JoinType.INNER);
            }

            Predicate predicate = criteriaBuilder.conjunction();

            if (!keyword.isEmpty()) {
                // 제목에 대한 검색어 조건 추가
                Predicate titlePredicate = criteriaBuilder.like(root.get("title"), "%" + keyword + "%");
                predicate = criteriaBuilder.and(predicate, titlePredicate);
            }

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("deleted"), false));
            query.orderBy(criteriaBuilder.asc(root.get("id")));
            return predicate;
        };
    }

    public static Specification<Board> contentContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if(Board.class.equals(query.getResultType())) {
                root.fetch("user", JoinType.INNER);
            }
            Predicate predicate = criteriaBuilder.conjunction();

            if (!keyword.isEmpty()) {
                // 본문에 대한 검색어 조건 추가
                Predicate contentPredicate = criteriaBuilder.like(root.get("content"), "%" + keyword + "%");
                predicate = criteriaBuilder.and(predicate, contentPredicate);
            }

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("deleted"), false));

            query.orderBy(criteriaBuilder.asc(root.get("id")));

            return predicate;
        };
    }

    public static Specification<Board> usernameContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if(Board.class.equals(query.getResultType())) {
                root.fetch("user", JoinType.INNER);
            }
            Predicate predicate = criteriaBuilder.conjunction();

            if (!keyword.isEmpty()) {
                // 작성자에 대한 검색어 조건 추가
                Predicate usernamePredicate = criteriaBuilder.like(root.get("user").get("username"), "%" + keyword + "%");
                predicate = criteriaBuilder.and(predicate, usernamePredicate);
            }

            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("deleted"), false));

            query.orderBy(criteriaBuilder.asc(root.get("id")));

            return predicate;
        };
    }

    public static Specification<Board> createSpecification(String searchType, String keyword) {
        return switch (searchType) {
            case "title" -> titleContains(keyword);
            case "content" -> contentContains(keyword);
            case "username" -> usernameContains(keyword);
            default -> throw new IllegalArgumentException("Invalid searchType: " + searchType);
        };
    }
}
