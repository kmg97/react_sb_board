import React, { useState} from 'react';
import { useAuth } from '../context/AuthProvider';
import "./LoginFormStyles.css";
import {NavLink, useNavigate} from "react-router-dom";

function Login() {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) { // 로그인 성공
                const userData = await response.json();
                login(userData); // Context를 사용하여 로그인 정보 저장
                alert("로그인 성공"); //client한테 로그인 인지
                navigate("/"); // 홈화면으로 페이지 이동
            } else {
                // 로그인 실패 처리
                alert("일치하는 회원 정보가 없습니다.");
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
        }
    };

    return (
        <div className="loginform">
            <label className="loginLabel">로그인</label>
            <input
                type="text"
                placeholder="이메일"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pro-btns">
                <button onClick={handleLogin} className="btn">로그인</button>
                <NavLink to={"/signup"} className="btn">
                        회원가입
                </NavLink>
            </div>
        </div>
    );
}

export default Login;