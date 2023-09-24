import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Board from "./Board";
import {useAuth} from "../context/AuthProvider";
import LoadingSpinner from "../../ui/LoadingSpinner";

const Detail = (props) => {
    const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const user = useAuth().user;

    useEffect(()=>{
        fetch(`http://localhost:8080/board/list/${idx}`, {
            method: "GET",
            headers: {
                // jwt 전달
                "Authorization": "Bearer " + user.token,
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                setBoard(data);
                console.log(data);
                setLoading(false);
            })
            .catch(error => {

                    alert('API 호출 오류:');
                }
            );
    },[])


    return (
        <div className="centered">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Board
                    id={board.id}
                    title={board.title}
                    username={board.username}
                    time={board.time}
                    text={board.text}
                />
            )}
        </div>
    );
};

export default Detail;