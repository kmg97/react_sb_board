import React, {useRef, useState} from 'react';
import "./NoticeSection.css";
import { NavLink } from "react-router-dom";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
        <div className="pagination">
            {Array.from({ length: Math.ceil(totalPages / 10) }, (_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(index )}
                    className={currentPage === index ? 'active' : ''}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

function NoticeSection(props) {
    const notice = props.notice;
    const titleRef = useRef("");

    function submitHandler(event) {
        event.preventDefault();
        const title = titleRef.current.value;
        // console.log(title);
        props.onSearchHandler(title);
    }

    function textLengthOverCut(txt, len, lastTxt) {
        if (len === "" || len == null) { // 기본값
            len = 20;
        }
        if (lastTxt === "" || lastTxt == null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    }

    return (
        <section className="notice">
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <form onSubmit={submitHandler}>
                            <div className="search-wrap">
                                <label htmlFor="search" className="blind">검색</label>
                                <input id="search" type="text" placeholder="검색어를 입력해주세요." ref={titleRef} />
                                <button type="submit" className="btn">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="board-list">
                <div className="container">
                    {notice.length === 0 ? (
                        <div className="board-div">
                            <div className="board-header">
                                <div className="board-idx">
                                    <span>번호</span>
                                </div>
                                <div className="board-writer">
                                    <span>작성자</span>
                                </div>
                                <div className="board-title">
                                    <span>제목</span>
                                </div>
                                <div className="board-date">
                                    <span>등록일</span>
                                </div>
                            </div>
                            <div>
                                <p>조회된 게시글이 없습니다.</p>
                            </div>
                        </div>

                    ) : (
                        <div className="board-div">
                            <div className="board-header">
                                <div className="board-idx">
                                    <span>번호</span>
                                </div>
                                <div className="board-writer">
                                    <span>작성자</span>
                                </div>
                                <div className="board-title">
                                    <span>제목</span>
                                </div>
                                <div className="board-date">
                                    <span>등록일</span>
                                </div>
                            </div>
                            {notice.map((noticeItem, index) => {
                                // ISO 8601 형식의 날짜 및 시간 문자열을 Date 객체로 파싱
                                const date = new Date(noticeItem.createAt);

                                // 날짜 및 시간을 원하는 형식으로 포맷
                                const formattedDateTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

                                return (
                                    <div className="board-item" key={noticeItem.id}>
                                        <div className="board-idx">
                                            <span>{(props.currentPage*10)+ index+1}</span>
                                        </div>
                                        <div className="board-writer">
                                            <span>{noticeItem.username}</span>
                                        </div>
                                        <div className="board-title">
                                          <span>
                                            <a href={"/board/item/" + noticeItem.id}>{textLengthOverCut(noticeItem.title, 14, "...")}</a>
                                          </span>
                                        </div>
                                        <div className="board-date">
                                            <span>{formattedDateTime}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <div className="button-container">
                        <Pagination
                            currentPage={props.currentPage}
                            totalPages={props.totalPages}
                            setCurrentPage={props.setCurrentPage}
                        />
                        <NavLink to="/Contact">
                            <button className="btn">글쓰기</button>
                        </NavLink>

                    </div>
                </div>
            </div>


        </section>
    );
}

export default NoticeSection;



