package com.board.domain;

import jakarta.persistence.*;
import lombok.*;

/*
     댓글 클래스 (다)
	- id
	- 게시글 id
	- 댓글 내용
	- 생성일시
	- 작성자
	- 수정일시

	보드 하나 조회 하면 -> 댓글 불러옴
	댓글 작성시 작성자 id 로 user 조회후
	세터로 넣어주자.
 */
@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTime {
    // 댓글 작성자 id
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 게시글
    /*FetchType fetch() default FetchType.EAGER;*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public void setBoard(Board board) {
        this.board = board;
        board.getComments().add(this);
    }

    private String comments;
}
