import "./BoardList.css";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import NoticeSection from "./NoticeSection";

const BoardList = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [title, setTitle] = useState(""); // 검색어 상태
    const [pageSize, setPageSize] = useState(10);

    const { logout } = useAuth();
    const location = useNavigate();

    // 데이터를 불러오는 함수
    const fetchData = () => {
        if (props.userInfo && props.userInfo.token != null) {
            fetch(`http://localhost:8080/api/board/list?title=${title}&page=${currentPage}&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + props.userInfo.token,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
                        location("../login");
                        logout();
                        return null;
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    setPosts(data.boards);
                    setTotalPages(data.totalSize);
                })
                .catch(error => {
                    console.error('API 호출 오류:', error);
                });
        } else {
            alert("로그인 후 이용해주세요");
            location("/login");
        }
    };

    if(posts.length!==0){
        console.log(posts)
    }

    // 검색어 변경 시 호출되는 함수
    const onSearchHandler = (event) => {
        const newTitle = event.toString();
        setTitle(newTitle);
        setCurrentPage(0); // 검색 시 페이지 초기화
    };

    // 페이지 변경 시 호출되는 함수
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // 검색어나 페이지 변경 시 데이터 다시 불러오기
    // 현재 페이지 변경시 기존 페이지로 데이터 불러오고
    // 바뀐 페이지로 데이터 불러오는 문제 발생
    useEffect(() => {
        fetchData();
    }, [currentPage, title, pageSize]);

    const onPageSizeChange = (newPageSize) => {
        // 페이지 크기를 업데이트하고 첫 번째 페이지로 이동
        setPageSize(newPageSize);
        setCurrentPage(0);
    };
    return (
        <>
            <NoticeSection
                notice={posts}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                setCurrentPage={onPageChange}
                onSearchHandler={onSearchHandler}
                onPageSizeChange={onPageSizeChange}
            />
        </>
    );
};

export default BoardList;