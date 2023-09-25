import "./BoardList.css";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import NoticeSection from "./NoticeSection";

const BoardList = (props) => {
    const [posts, setPosts] = useState([]);
    const {logout} = useAuth();
    const location = useNavigate();

    useEffect(() => {
        if (props.userInfo && props.userInfo.token != null) {
            fetch('http://localhost:8080/board/list', {
                method: "GET",
                headers: {
                    // jwt 전달
                    "Authorization": "Bearer " + props.userInfo.token,
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        // 상태 코드가 401인 경우 알림을 표시
                        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");

                        location("../login")
                        logout();
                        // 필요한 다른 작업 수행
                        return null; // 또는 다른 작업을 수행하고 return
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    setPosts(data);
                    console.log(data);
                })
                .catch(error => {
                        console.error('API 호출 오류:', error);
                    }
                );
        } else {
            alert("로그인 후 이용해주세요");
            location("/login")
        }
    }, [location, logout, props.userInfo]);

    return (
        // <div className="work-container">
        //   <h1 className="project-heading">게시글</h1>
        //   <div className="project-container">
        //     {posts.map((val,idx)=>{
        //       return (
        //         <BoardListCard
        //           key={idx}
        //           id={val.id}
        //           title={val.title}
        //           text={val.text}
        //         />
        //       )
        //     })}
        //   </div>
        // </div>
        <NoticeSection notice={posts}/>
    );
};

export default BoardList;
