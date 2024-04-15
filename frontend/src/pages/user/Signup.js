import React, { useState } from 'react';
import "../../styles/LoginFormStyles.css";
import {NavLink} from "react-router-dom";
import useLoginCheck from "../../util/useLoginCheck";

function Signup(props) {
    // useLoginCheck = Context 내부에 user가 null인지 체크해서 있다면 홈으로 이동
    useLoginCheck();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setName] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');

    const [preUsername, setPreUsername] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [isPasswordValid, setIsPasswordValid] = useState(null);
    const [isFullnameValid, setIsFullnameValid] = useState(null);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(null);
    const [isStreetValid, setIsStreetValid] = useState(null);
    const [isCityValid, setIsCityValid] = useState(null);
    const [isEmailValid, setIsEmailValid] = useState(null);

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // password 유효성 검사
        const hasLowerCase = /[a-z]/.test(newPassword);
        const hasNumber = /\d/.test(newPassword);
        const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(newPassword);
        const isLengthValid = newPassword.length >= 8;

        // 모든 조건을 충족 하는지 확인
        const isPasswordValid = hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;
        setIsPasswordValid(isPasswordValid);
    };

    // 회원 이름 유효성 검사 함수 추가
    const handleFullnameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setIsFullnameValid(value.trim() !== ''); // 비어 있지 않은지 검사
    };

    // 핸드폰 번호 유효성 검사 함수 추가
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setIsPhoneNumberValid(value.trim() !== '');
    };

    // 주소(street) 유효성 검사 함수 추가
    const handleStreetChange = (e) => {
        const value = e.target.value;
        setStreet(value);
        setIsStreetValid(value.trim() !== ''); // 비어 있지 않은지 검사
    };

    // 주소(city) 유효성 검사 함수 추가
    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        setIsCityValid(value.trim() !== ''); // 비어 있지 않은지 검사
    };

    // 이메일 유효성 검사 함수 추가
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        const isEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/.test(value);
        setIsEmailValid(isEmail);
    };

    const singupHandler = ()=> {
        if (
            isUsernameAvailable === true &&
            isFullnameValid &&
            isPhoneNumberValid &&
            isStreetValid &&
            isCityValid &&
            isEmailValid
        ) {
            const user = {
                username : username.trim(),
                password : password.trim(),
                fullname : fullname.trim(),
                phoneNumber:phoneNumber.trim(),
                street:street.trim(),
                city:city.trim(),
                email:email.trim(),
            };
            try {
                props.onSignup(user)
            } catch (error) {
                console.error('회원가입 오류:', error);
            }
        } else {
            console.error('유효성 검사 실패');
        }
    }

    const handleBlur = (username) => {
        if(username.trim()!=='' && preUsername!==username){
            fetch(`http://localhost:8080/api/user/register/${username}/exists`, {
                method: 'GET', // 예시로 POST 메서드 사용
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('네트워크 오류');
                    }
                    return response.json();
                })
                .then((data) => {
                    setIsUsernameAvailable(!data);
                    setPreUsername(username);
                })
                .catch((error) => {
                    console.error('fetch 오류:', error);
                });
        }
        if(username.trim()===''){
            setIsUsernameAvailable(null);
        }
    }

    return (
        <div className="loginform">
            <label className="loginLabel">회원가입</label>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => handleBlur(username)}
            />
            {isUsernameAvailable === null ? null : (
                isUsernameAvailable ? (
                    <span className="available">사용 가능한 아이디입니다.</span>
                ) : (
                    <span className="duplicate">중복된 아이디입니다.</span>
                )
            )}
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
            />
            {isPasswordValid === null ? null:(
                    isPasswordValid ?(
                    <span className="available">
                        사용가능한 비밀번호 입니다.
                    </span>):(<span className="duplicate">
                        비밀번호는 영문 소문자와 숫자, 특수기호가 적어도 1개 이상씩 포함된 8자 ~ 20자의 비밀번호여야 합니다.
                    </span>
                    )
                )
            }
            <input
                type="text"
                placeholder="이름"
                value={fullname}
                onChange={handleFullnameChange}
            />
            {isFullnameValid === null ? null: (!isFullnameValid && <span className="duplicate">이름을 입력해주세요.</span>)}
            <input
                type="text"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
            />
            {isPhoneNumberValid === null ? null: (!isPhoneNumberValid && <span className="duplicate">핸드폰 번호를 입력해주세요.</span>)}
            <input
                type="text"
                placeholder="도시"
                value={city}
                onChange={handleCityChange}
            />
            {isCityValid === null ? null: (!isCityValid && <span className="duplicate">주소를 입력해주세요.</span>)}
            <input
                type="text"
                placeholder="주소"
                value={street}
                onChange={handleStreetChange}
            />
            {isStreetValid === null ? null: (!isStreetValid && <span className="duplicate">상세주소를 입력해주세요.</span>)}
            <input
                type="text"
                placeholder="이메일"
                value={email}
                onChange={handleEmailChange}
            />
            {isEmailValid === null ? null: (!isEmailValid && <span className="duplicate">이메일을 입력해주세요.</span>)}
            <div className="pro-btns">
                <button onClick={singupHandler}
                        className={ isUsernameAvailable &&
                        isPasswordValid &&
                        isFullnameValid &&
                        isPhoneNumberValid &&
                        isStreetValid &&
                        isCityValid &&
                        isEmailValid
                            ? 'btn'
                            : 'disabled'}
                        disabled={!isUsernameAvailable ||
                            !isPasswordValid ||
                            !isFullnameValid ||
                            !isPhoneNumberValid ||
                            !isStreetValid ||
                            !isCityValid ||
                            !isEmailValid}>회원가입</button>
                <NavLink to={"/home"} className="btn">
                        취소
                </NavLink>
            </div>
        </div>

    );
}

export default Signup;