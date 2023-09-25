import "./FormStyles.css";

import React, { useRef } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./context/AuthProvider";

const Form = (props) => {

  const user = useAuth().user;
  const navigateFunction = useNavigate();

  const titleRef = useRef("");
  const EmailRef = useRef("");
  const TextRef = useRef("");
  function submitHandler(event) {
    event.preventDefault();
    if( user == null) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (titleRef.current.value.trim().length === 0) {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    } else if (EmailRef.current.value.trim().length === 0) {
      alert("연락처를 입력해주세요.");
      EmailRef.current.focus();
      return;
    }

    const contact = {
      username : user.username,
      title : titleRef.current.value,
      text : TextRef.current.value,
      time : new Date()
    };

    console.log(user);
    props.onAddContact(contact);

    alert("제출 되었습니다!");

    titleRef.current.disabled = true;
    TextRef.current.disabled = true;

    document.querySelector(".smbtn").classList.add("btn-light");
    document.querySelector(".smbtn").disabled = true;
  }



  function cancelHandler () {
    // 글 작성 취소 로직 실행
    const check = window.confirm("글 작성을 취소 하시겠습니까?");
    if (check) {
      navigateFunction("/")
    }
    // 원하는 작업을 수행한 후 페이지 이동을 원치 않을 경우 다음 라인 주석 처리
  }

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <label>제목</label>
        <input
          type="text"
          ref={titleRef}
          placeholder="제목을 작성해주세요"
        ></input>
        <label>연락처</label>
        <input
          type="text"
          ref={EmailRef}
          placeholder="이메일 또는 전화번호를 작성해주세요"
        ></input>
        <label>남기실 말씀</label>
        <textarea
          row="6"
          placeholder="남기실 말씀을 작성해주세요"
          ref={TextRef}
        />
        <div className="two-btn">
          <button className="btn smbtn">저장</button>
          <button onClick={cancelHandler} className="btn smbtn" type="button">취소</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
