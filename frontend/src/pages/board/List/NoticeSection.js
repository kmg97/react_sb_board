import React, {useRef} from 'react';
import "./NoticeSection.css";
import {NavLink} from "react-router-dom";
import Pagination from "./Pagination";

function NoticeSection(props) {
    const notice = props.notice;
    const titleRef = useRef("");

    function submitHandler(event) {
        event.preventDefault();
        const title = titleRef.current.value;
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

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    return (
        <section className="notice">
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <div className="form-container">
                            <form onSubmit={submitHandler} className="form">
                                <div className="search-wrap">
                                    <label htmlFor="search" className="blind">검색</label>
                                    <input id="search" type="text" placeholder="검색어를 입력해주세요." ref={titleRef} />
                                    <button type="submit" className="btn">검색</button>
                                </div>
                            </form>
                            <select value={props.pageSize} className="custom-select" onChange={(e) => props.onPageSizeChange(Number(e.target.value))}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                            </select>
                            <label>개씩 보기</label>


                        </div>
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
                                <div className="board-date">
                                    <span>최종수정일</span>
                                </div>
                            </div>
                            {notice.map((noticeItem, index) => {
                                return (
                                    <div className="board-item" key={noticeItem.id}>
                                        <div className="board-idx">
                                            <span>{(props.currentPage * props.pageSize) + index + 1}</span>
                                        </div>
                                        <div className="board-writer">
                                            <span>{noticeItem.username}</span>
                                        </div>
                                        <div className="board-title">
                                            <span>
                                                <a href={"/board/item/" + noticeItem.id}>
                                                    {textLengthOverCut(noticeItem.title, 14, "...")}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="board-date">
                                            <span>{formatDateTime(noticeItem.createdAt)}</span>
                                        </div>
                                        <div className="board-date">
                                            <span>{formatDateTime(noticeItem.modifiedAt)}</span>
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
                            pageSize={props.pageSize}
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