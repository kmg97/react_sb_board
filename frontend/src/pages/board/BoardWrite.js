import "./BoardWrite.css";

import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";

const BoardWrite = (props) => {

  const user = useAuth().user;
  const navigateFunction = useNavigate();

  const titleRef = useRef("");
  const EmailRef = useRef("");
  const ContentRef = useRef("");

  const [fileList, setFileList] = useState([]);

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
    const formData = new FormData();
    formData.append("username", user ? user.username : "");
    formData.append("title", titleRef.current.value);
    formData.append("content", ContentRef.current.value);
    fileList.forEach((file) => {
      if (file) {
        console.log(file.element.files[0])
        formData.append("files", file.element.files[0]);
      }
    });

    props.onAddContact(formData);

    alert("제출 되었습니다!");

    titleRef.current.disabled = true;
    ContentRef.current.disabled = true;

    document.querySelector(".smbtn").classList.add("btn-light");
    document.querySelector(".smbtn").disabled = true;
  }


  const selectFile = (event, index) => {
    const file = event.target.files[0];

    if (!file) {
      // 파일 선택을 취소한 경우
      const updatedFileList = [...fileList];
      updatedFileList[index] = null; // null로 설정하여 이전 파일 정보 삭제
      setFileList(updatedFileList);
      return;
    }

    const fileSize = Math.floor(file.size / 1024 / 1024);
    if (fileSize > 255) {
      alert('10MB 이하의 파일로 업로드해 주세요.');
      event.target.value = '';
      return;
    }

    // Create a new file object with file name
    const fileObject = {
      name: file.name,
      element: event.target,
    };

    const updatedFileList = [...fileList];
    updatedFileList[index] = fileObject;
    setFileList(updatedFileList);
  };

  const addFile = () => {
    setFileList([...fileList, null]); // Add a null placeholder
  };

  const removeFile = (index) => {
    const updatedFileList = [...fileList];
    updatedFileList.splice(index, 1);
    setFileList(updatedFileList);
  };


  function cancelHandler () {
    console.log(fileList)
    // 글 작성 취소 로직 실행
    const check = window.confirm("글 작성을 취소 하시겠습니까?");
    if (check) {
      navigateFunction("/")
    }
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
          ref={ContentRef}
        />
        <div className="file_list">
          {fileList.map((file, index) => (
              <div key={index}>
                <div className="file_input">
                  <input type="text" readOnly value={file ? file.name : ''} />
                  <label>
                    선택
                    <input
                        type="file"
                        name="files"
                        onChange={(event) => selectFile(event, index)}
                    />
                  </label>
                  <label
                      type="button"
                      onClick={() => removeFile(index)}
                      className="btns del_btn"
                  >삭제
                  </label>
                </div>
              </div>
          ))}
        </div>
        <button type="button" onClick={addFile} className="btns fn_add_btn">
          <span>파일 추가</span>
        </button>
        <div className="two-btn">
          <button className="btn smbtn">저장</button>
          <button onClick={cancelHandler} className="btn smbtn" type="button">취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardWrite;
