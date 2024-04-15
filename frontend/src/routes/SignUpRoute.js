import React from "react";
import {useTitle} from "../util/UpdateTitle";
import Header from "../commons/Header";
import Footer from "../commons/Footer";
import useLoginCheck from "../util/useLoginCheck";
import Signup from "../pages/user/Signup";

const SignUpRoute = (props) => {
    useTitle("SignUp");

    // useLoginCheck = Context 내부에 user가 null인지 체크해서 있다면 홈으로 이동
    // 또한 useNavigate() 반환
    useLoginCheck();

    return (
        <div>
            <Header />
            <Signup onSignup={props.onSignup}/>
            <Footer />
        </div>
    );
};

export default SignUpRoute;
