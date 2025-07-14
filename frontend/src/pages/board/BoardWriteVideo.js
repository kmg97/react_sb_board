import "../../styles/BoardWrite.css";

import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";

const BoardWriteVideo = (props) => {

  const user = useAuth().user;
  const navigateFunction = useNavigate();

  const titleRef = useRef("");
  const ContentRef = useRef("");

  const [fileList, setFileList] = useState([]);

  function submitHandler(event) {
    event.preventDefault();
    if( user == null) {
      alert("로그인 후 이용해주세요.");
      navigateFunction("/login");
      return;
    }

    if (titleRef.current.value.trim().length === 0) {
      alert("제목을 입력해주세요.");
      titleRef.current.focus();
      return;
    }
    if (ContentRef.current.value.trim().length === 0) {
      alert("본문을 입력해주세요.");
      titleRef.current.focus();
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

  const sendVideoChunks = () => {
    const chunkSize = 1024 * 1024; // 1MB
    const file = document.getElementById("video-file").files[0];
    const resultElement = document.getElementById("result");

    // total size 계산
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    // chunk file 전송
    const sendNextChunk = () => {

      // chunk size 만큼 데이터 분할
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      const chunk = file.slice(start, end);

      // form data 형식으로 전송
      const formData = new FormData();
      formData.append("chunk", chunk, file.name);
      formData.append("chunkNumber", currentChunk);
      formData.append("totalChunks", totalChunks);

      fetch("/api/chunk/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": "Bearer " + props.userInfo.token
        }
      }).then(resp => {
        // 전송 결과가 206이면 다음 파일 조각 전송
        if (resp.status === 206) {
          // 진행률 표시
          resultElement.textContent = Math.round(currentChunk / totalChunks * 100) + "%"
          currentChunk++;
          if (currentChunk < totalChunks) {
            sendNextChunk();
          }
          // 마지막 파일까지 전송 되면
        } else if (resp.status === 200) {
          resp.text().then(data => resultElement.textContent = data);
        }
      }).catch(err => {
        console.error("Error uploading video chunk");
      });
    };

    sendNextChunk();
  }

  return (
    <div className="form">
    <form>
      <input id="video-file" type="file" name="file" />
      <button type="button" onClick={sendVideoChunks}>업로드</button>
      <div id="result"></div>
    </form>

    </div>
  );
};

export default BoardWriteVideo;
