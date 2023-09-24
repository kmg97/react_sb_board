import "./BoardList.css";
import BoardListCard from "./BoardListCard";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
const BoardList = (props) => {
  const [posts, setPosts] = useState([]);
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
                .then(response => response.json())
                .then(data => {
                    setPosts(data);
                    console.log(data);
                })
                .catch(error => {
                        console.error('API 호출 오류:', error);
                    }
                );
        } else {
            console.log("로그인 후 이용해주세요");
            location("/login")
        }
    },[]);

  return (
    <div className="work-container">
      <h1 className="project-heading">게시글</h1>
      <div className="project-container">
        {posts.map((val,idx)=>{
          return (
            <BoardListCard
              key={idx}
              id={val.id}
              title={val.title}
              text={val.text}
            />
          )
        })}
      </div>
    </div>
  );
};

export default BoardList;
