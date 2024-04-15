import React from "react";
import "../../../styles/Pagination.css";

function Pagination({ currentPage, totalPages, setCurrentPage, pageSize}) {
    const pages = Math.ceil(totalPages / pageSize ); // 전체 페이지 수 계산
    const pageNumbers = Array.from({ length: pages }, (_, index) => index );

    const startPage = (Math.floor((currentPage) / 10) * 10) + 1; // 현재 페이지가 속한 블록의 첫 페이지
    const endPage = Math.min(startPage + 9, pages); // 현재 페이지가 속한 블록의 마지막 페이지

    return (
        <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                이전
            </button>
            {pageNumbers.slice(startPage - 1, endPage).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? 'active' : ''}
                >
                    {page+1}
                </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pages-1 || pages === 0}>
                다음
            </button>
        </div>
    );
}

export default Pagination;