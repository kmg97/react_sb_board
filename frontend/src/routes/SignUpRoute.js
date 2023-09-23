import {useTitle} from "../util/UpdateTitle";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import React from "react";
import SignUpPage from "../components/UserPage/SignUpPage";
import useLoginCheck from "../util/useLoginCheck";

const SignUpRoute = () => {
    useTitle("SignUp");

    // useLoginCheck = Context 내부에 user가 null인지 체크해서 있다면 홈으로 이동
    // 또한 useNavigate() 반환
    useLoginCheck();

    return (
        <div>
            <Header />
            <SignUpPage />
            <Footer />
        </div>
    );
};

export default SignUpRoute;
