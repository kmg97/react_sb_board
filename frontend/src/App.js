import React, {Suspense} from "react";
import "./index.css";
import Home from "./routes/Home";

import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import NotFound from "./routes/NotFound";
import LoadingSpinner from "./ui/LoadingSpinner";
import LoginRoute from "./routes/LoginRoute";
import SignUpRoute from "./routes/SignUpRoute";
import {useAuth} from "./components/context/AuthProvider";
import BoardDetail from "./routes/BoardDetail";
import BoardEdit from "./routes/BoardEdit";

const Project = React.lazy(() => import("./routes/List"));
const Contact = React.lazy(() => import("./routes/Write"));

function App() {
    const user = useAuth().user;
    const {login} = useAuth();
    const navigate = useNavigate();

    // 게시글 작성 API
    async function addContactHandler(event) {
        const response = await fetch(
            "http://localhost:8080/board",
            {
                method: "POST",
                body: JSON.stringify(event),
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
    }

    // Login API
    async function loginHandler(event) {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (response.ok) { // 로그인 성공
            const userData = await response.json();

            const setUserData = { username:userData.username, token:userData.token, roles:userData.roles[0].name};

            login(setUserData); // Context를 사용하여 로그인 정보 저장
            alert("로그인 성공"); //client한테 로그인 인지
            navigate("/"); // 홈화면으로 페이지 이동
        } else {
            // 로그인 실패 처리
            alert("일치하는 회원 정보가 없습니다.");
        }
    }

    async function onSignupHandler (event){
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (response.ok) {
            alert("회원가입이 완료 되었습니다. 로그인 해주세요.");
            navigate("/login");
        } else if (response.status === 401) {
            const message= '중복된 아이디 입니다.';
            alert(message);
        }
    }

    return (
        <>
            <Suspense
                fallback={
                    <div className="centered">
                        <LoadingSpinner/>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/board" element={<Project userInfo={user}/>}/>
                    <Route
                        path="/contact"
                        element={<Contact onAddContact={addContactHandler}/>}
                    />
                    <Route path="/login" element={<LoginRoute onLogin={loginHandler}/>}/>
                    <Route path="/signup" element={<SignUpRoute onSignup={onSignupHandler}/>}/>
                    <Route path="/board/:idx" element={<BoardDetail userInfo={user}/>}/>
                    <Route path="/board/edit/:id" element={<BoardEdit userInfo={user}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
