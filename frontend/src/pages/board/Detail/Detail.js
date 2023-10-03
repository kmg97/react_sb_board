import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import BoardDetail from "./BoardDetail";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import {useAuth} from "../../../context/AuthProvider";

/* username이 게시글의 username과 같으면 수정, 삭제 버튼을 내놔야 되지 않을까? */
/* 변수 idx 를 useParams로 여기서 조회하는게 아니라 Route에서 props로 전달해도 되지 않을까? */
/* fetch API를 전역적으로 관리하는 곳이 있으면 좋겠는데 */
const Detail = (props) => {
    const location = useNavigate();
    const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const {logout} = useAuth();
    useEffect(()=>{
        if (props.userInfo && props.userInfo.token != null) {
            fetch(`http://localhost:8080/api/board/list/${idx}`, {
                method: "GET",
                headers: {
                    // jwt 전달
                    "Authorization": "Bearer " + props.userInfo.token,
                    "Content-Type": "application/json",
                }
            })
                .then((response) => {
                        if(response.status===401){
                            throw new Error("권한이 없는 사용자입니다.")
                        }
                        if(response.status===403) {
                            throw new Error("인증되지 않은 사용자입니다.")
                        }
                        return response.json();
                    }
                )
                .then(data => {
                    setBoard(data);
                    console.log(data);
                    setLoading(false);
                })
                .catch(error => {
                    alert(error.message);
                    logout();
                    location('/');
                }
                );
        } else {
            alert("로그인 후 이용해주세요");
            location("/login");
        }
    },[idx, location,props.userInfo, logout])

    return (
        <div>
            {loading ? (
                <div className="centered">
                    <LoadingSpinner />
                </div>
            ) : (
                <BoardDetail
                    userInfo={props.userInfo}
                    id={board.id}
                    title={board.title}
                    username={board.username}
                    createdAt={board.createdAt}
                    modifiedAt={board.modifiedAt}

                    content={board.content}
                    comments={board.comments}
                    files={board.files}
                />
            )}
        </div>
    );
};

export default Detail;