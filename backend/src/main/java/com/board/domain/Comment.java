package com.board.domain;

import jakarta.persistence.*;

import java.util.Date;

/*
     댓글 클래스 (다)
	- id
	- 게시글 id
	- 댓글 내용
	- 생성일시
	- 작성자
	- 수정일시

	보드 하나 조회 하면 -> 댓글 불러옴
* */
@Entity
public class Comment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    private String comments;
    private String time;
    private String createAt;
    private Date modifiedAt;
}
