import React, { useState} from 'react';
import "./LoginFormStyles.css";
import {NavLink} from "react-router-dom";

function Login(props) {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            props.onLogin({ username, password });
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
            <div className="two-btn">
                <button onClick={handleLogin} className="btn">로그인</button>
                <NavLink to={"/signup"} className="btn">
                        회원가입
                </NavLink>
            </div>
        </div>
    );
}

export default Login;