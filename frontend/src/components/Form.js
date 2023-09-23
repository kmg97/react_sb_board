import "./FormStyles.css";

import React, { useRef } from "react";

const Form = (props) => {


  const NameRef = useRef("");
  const EmailRef = useRef("");
  const TextRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    if (NameRef.current.value.trim().length === 0) {
      alert("성함을 입력해주세요.");
      NameRef.current.focus();
      return;
    } else if (EmailRef.current.value.trim().length === 0) {
      alert("연락처를 입력해주세요.");
      EmailRef.current.focus();
      return;
    }

    const contact = {
      name: NameRef.current.value,
      email: EmailRef.current.value,
      text: TextRef.current.value,
      time: new Date().toLocaleString()
    };

    props.onAddContact(contact);

    alert("제출 되었습니다!");

    NameRef.current.disabled = true;
    EmailRef.current.disabled = true;
    TextRef.current.disabled = true;

    document.querySelector(".smbtn").classList.add("btn-light");
    document.querySelector(".smbtn").disabled = true;
  }

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <label>성함</label>
        <input
          type="text"
          ref={NameRef}
          placeholder="성함을 작성해주세요"
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
        <button className="btn smbtn">저장</button>
      </form>
    </div>
  );
};

export default Form;
