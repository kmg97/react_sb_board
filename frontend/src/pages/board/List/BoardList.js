import "./BoardList.css";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import ListSection from "./ListSection";

const BoardList = (props) => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState(""); // 검색어 상태
    const [pageSize, setPageSize] = useState(10);
    const [type, setType] = useState("");

    const { logout } = useAuth();
    const location = useNavigate();

    // 데이터를 불러오는 함수
    const fetchData = () => {
        if (props.userInfo && props.userInfo.token != null) {
            fetch(`http://localhost:8080/api/board/list?searchType=${type}&searchKeyword=${keyword}&page=${currentPage}&pageSize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + props.userInfo.token,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.")
                    }
                    if (response.status === 403) {
                        throw new Error("권한이 없습니다.")
                    }
                    return response.json();
                })
                .then(data => {
                    setPosts(data.boards);
                    setTotalPages(data.totalSize);
                })
                .catch(error => {
                    alert(error.message);
                    logout();
                    location("../login");
                });
        } else {
            alert("로그인 후 이용해주세요");
            location("/login");
        }
    };

    // 검색어 변경 시 호출되는 함수
    const onSearchHandler = (event) => {

        const keyword = event.keyword;
        const type=event.type;
        setType(type)
        setKeyword(keyword);
        setCurrentPage(0); // 검색 시 페이지 초기화
    };

    // 페이지 변경 시 호출되는 함수
    const onPageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // 검색어나 페이지 변경 시 데이터 다시 불러오기
    useEffect(() => {
        fetchData();
    }, [currentPage, keyword, pageSize]);

    const onPageSizeChange = (newPageSize) => {
        // 페이지 크기를 업데이트하고 첫 번째 페이지로 이동
        setPageSize(newPageSize);
        setCurrentPage(0);
    };
    return (
        <>
            <ListSection
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