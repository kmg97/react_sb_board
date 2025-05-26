package com.board.domain;

import com.board.dto.board.BoardRequest;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE board SET IS_DEL = true WHERE BOARD_ID = ?")
public class Board extends BaseTime {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="BOARD_ID")
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    private String title;

    /*
    @Lob
    매핑하는 필드 타입이 문자면 CLOB을 매핑하고 나머지는 BLOB을 매핑한다.
    CLOB : String, char[]
    BLOB : byte[]*/
    @Lob
    private String content;

    /*  "orphanRemoval"이 활성화된 경우, 부모 엔티티(One 쪽)에서 자식 엔티티(Many 쪽)를 삭제할 때
        자동으로 데이터베이스에서 해당 자식 엔티티도 삭제됩니다.

        "orphanRemoval"이 비활성화된 경우, 부모 엔티티에서 자식 엔티티를 제거해도 데이터베이스에서
        해당 자식 엔티티는 삭제되지 않습니다. 그러나 관계가 끊어지고 나면 해당 자식 엔티티의 부모 참조는
        null이 됩니다.*/
    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL,  orphanRemoval = true)
    private List<Comment> comments;

    @JsonIgnore
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FileEntity> fileEntity;

    @Column(name="IS_DEL")
    private boolean deleted = Boolean.FALSE; // 삭제 여부 기본값 false

    public static Board from (User user, BoardRequest request) {
        Board board = new Board();

        board.setUser(user);
        board.setTitle(request.getTitle());
        board.setContent(request.getContent());

        return board;
    }
}
