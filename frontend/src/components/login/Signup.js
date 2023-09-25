import React, { useState } from 'react';
import "./LoginFormStyles.css";
import {NavLink} from "react-router-dom";
import useLoginCheck from "../../util/useLoginCheck";

function Signup(props) {
    // useLoginCheck = Context 내부에 user가 null인지 체크해서 있다면 홈으로 이동
    // 또한 useNavigate() 반환
    useLoginCheck();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');

    const singupHandler = ()=>{
        const user = {username, password, fullname, phone, street, city, email};
        try {
            // 서버에서 로그인 API 호출
            props.onSignup(user)
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <div className="loginform">
            <label className="loginLabel">회원가입</label>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="이름"
                value={fullname}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type="text"
                placeholder="도시"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                placeholder="주소"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <div className="pro-btns">
                <button onClick={singupHandler} className="btn">회원가입</button>
                <NavLink to={"/home"} className="btn">
                        취소
                </NavLink>
            </div>

        </div>

    );
}

export default Signup;