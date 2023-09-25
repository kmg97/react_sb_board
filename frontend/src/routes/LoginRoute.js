import React from "react";
import {useTitle} from "../util/UpdateTitle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useLoginCheck from "../util/useLoginCheck";
import Login from "../pages/user/Login";

const LoginRoute = (props) => {
    useTitle("LoginRoute");

    // useLoginCheck = Context 내부에 user가 null인지 체크해서 있다면 홈으로 이동
    // 또한 useNavigate() 반환
    useLoginCheck();

    return (
        <div>
            <Header />
            <Login onLogin={props.onLogin}/>
            <Footer />
        </div>
    );
};

export default LoginRoute;
