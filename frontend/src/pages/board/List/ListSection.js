import React, {useRef, useState} from 'react';
import "./ListSection.css";
import {NavLink} from "react-router-dom";
import Pagination from "./Pagination";

function ListSection(props) {
    const notice = props.notice;
    const keywordRef = useRef("");
    const [type, setType] = useState("title");
    function submitHandler(event) {
        event.preventDefault();
        const keyword = keywordRef.current.value;
        props.onSearchHandler({type,keyword});
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
    console.log(props.totalPages)
    return (
        <section className="notice">
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <div className="form-container">
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="title">제목</option>
                                <option value="content">본문</option>
                                <option value="username">작성자</option>
                            </select>
                            <form onSubmit={submitHandler} className="form">
                                <div className="search-wrap">
                                    <label htmlFor="search" className="blind">검색</label>
                                    <input id="search" type="text" placeholder="검색어를 입력해주세요." ref={keywordRef} />
                                    <button type="submit" className="btn">검색</button>
                                </div>
                            </form>
                            <select value={props.pageSize} className="custom-select" onChange={(e) => props.onPageSizeChange(Number(e.target.value))}>
                                {props.totalPages <= 10 && (
                                    <>
                                        <option value={10}>10</option>
                                    </>
                                )}
                                {props.totalPages > 10 && props.totalPages <= 20 && (
                                    <>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </>
                                )}
                                {props.totalPages > 20 && props.totalPages <= 30 && (
                                    <>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                    </>
                                )}
                                {props.totalPages > 30 && props.totalPages <= 40 && (
                                    <>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={40}>40</option>
                                    </>
                                )}
                                {props.totalPages > 40 && (
                                    <>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={40}>40</option>
                                        <option value={50}>50</option>
                                    </>
                                )}
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

export default ListSection;