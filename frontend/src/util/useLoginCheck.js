import {useAuth} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

// 커스텀 훅 정의
function useLoginCheck() {
    const user = useAuth().user;
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null) {
            navigate("/error")
        }
    }, [user, navigate]);

    return navigate;
}

export default useLoginCheck;

