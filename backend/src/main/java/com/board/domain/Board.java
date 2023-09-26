package com.board.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="BOARD_ID")
    public Long id;

    @Column(unique = true)
    private String username;
    private String title;
    // CLOB, BLOB 택 1
    private String text;
    private Date createAt;

    /*  "orphanRemoval"이 활성화된 경우, 부모 엔티티(One 쪽)에서 자식 엔티티(Many 쪽)를 삭제할 때
        자동으로 데이터베이스에서 해당 자식 엔티티도 삭제됩니다.

        "orphanRemoval"이 비활성화된 경우, 부모 엔티티에서 자식 엔티티를 제거해도 데이터베이스에서
        해당 자식 엔티티는 삭제되지 않습니다. 그러나 관계가 끊어지고 나면 해당 자식 엔티티의 부모 참조는
        null이 됩니다.*/
    @JsonIgnore
    @OneToMany(mappedBy = "board", orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Comment> comments;
}
