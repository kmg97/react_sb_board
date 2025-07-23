import "./DetailEdit.css";

import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthProvider";

const FileInput = React.memo(({ file, idx, selectExistingFile, removeExistingFile }) => {
  return (
      <div key={file.id}>
        <div className="file_input">
          <input
              type="text"
              readOnly
              value={file && file.originalName ? file.originalName : file.name}
          />
          <label>
            선택
            <input
                type="file"
                name="files"
                onChange={(event) => selectExistingFile(event, file.id, idx)}
            />
          </label>
          <label
              type="button"
              onClick={() => removeExistingFile(idx, file.id)}
              className="btns del_btn"
          >
            삭제
          </label>
        </div>
      </div>
  );
});


const DetailEdit = (props) => {
  const user = useAuth().user;
  const location = useLocation();
  const { idx } = useParams();


  // location의 state 값을 확인
  const state = location.state;
  const [title,setTitle] = useState(state.props.title);
  const [content,setContent] = useState(state.props.content);

  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [existingFiles, setExistingFiles] = useState(state.props.files || []); // 기존 파일
  const [removedFileIndices, setRemovedFileIndices] = useState([]);

  /*navigate 함수가 동작하지 않는 이유는, 함수가 비동기적으로 동작하기 때문입니다.
  navigate 함수가 호출되고 나면 현재 렌더링된 컴포넌트가 먼저 실행되고,
  페이지 이동은 비동기적으로 수행됩니다. 따라서 navigate 함수가 호출되고 나서
  현재 컴포넌트의 나머지 부분이 실행되고 페이지가 변경되므로, navigate 함수 호출
  이후에는 추가적인 코드 실행이 발생할 수 있습니다.
  따라서 navigate 함수를 호출한 이후에 바로 페이지 이동을 하지 않고,
  리다이렉션을 수행하려면 다음과 같이 setTimeout 함수를 사용하여 페이지 이동을 지연시킬 수 있습니다*/
  if (!state || !state.props) {
    alert("에러")
    setTimeout(() => {
      navigate("/");
    }, 0);
    return;
  }
  /*위 코드에서 setTimeout 함수를 사용하여 navigate 함수를 비동기적으로 호출하고,
  0ms(즉, 즉시) 후에 페이지 이동을 수행하도록 설정하였습니다.
  이렇게 하면 navigate 함수가 현재 코드 실행 이후에 페이지 이동을 수행한다.*/

  // 파일 선택 및 삭제 함수
  const selectFile = (event, index) => {
    const file = event.target.files[0];

    if (!file) {
      // 파일 선택을 취소한 경우
      const updatedFileList = [...fileList];
      updatedFileList[index] = null;
      setFileList(updatedFileList);
      return;
    }

    const fileSize = Math.floor(file.size / 1024 / 1024);
    if (fileSize > 255) {
      alert("255MB 이하의 파일로 업로드해 주세요.");
      event.target.value = "";
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
    console.log(index)
    const updatedFileList = [...fileList];
    updatedFileList.splice(index, 1);
    setFileList(updatedFileList);
  };

  // 기존 파일 선택 함수
  const selectExistingFile = (event, fileIdx ,index) => {
    const file = event.target.files[0];
    if (!file) {
      // 파일 선택을 취소한 경우
      const updatedExistingFiles = [...existingFiles];
      updatedExistingFiles[index] = null;
      setExistingFiles(updatedExistingFiles);
      return;
    }

    // 기존 파일 목록을 수정
    const updatedExistingFiles = [...existingFiles];
    updatedExistingFiles[index] = {
      name: file.name,
      element: event.target,
    };
    setExistingFiles(updatedExistingFiles);
    setRemovedFileIndices([...removedFileIndices, fileIdx]);

  };

// 기존 파일 삭제 함수
  const removeExistingFile = (index, fileIdx) => {
    const updatedExistingFiles = [...existingFiles];
    updatedExistingFiles.splice(index, 1);
    setExistingFiles(updatedExistingFiles);
    if(fileIdx){
      setRemovedFileIndices([...removedFileIndices, fileIdx]); // 삭제한 파일의 인덱스를 기록
    }
  };

  function submitHandler(event) {
    event.preventDefault();

    // 기존 파일과 새로 추가한 파일을 분리
    const changeFiles = existingFiles.filter((file) => file && file.element);
    const newFiles = fileList.filter((file) => !file || !file.id);

    const formData = new FormData();
    formData.append("username", user ? user.username : "");
    formData.append("title", title);
    formData.append("content", content);

    if(removedFileIndices.length!==0){
      formData.append("removeItem", removedFileIndices);
    }
    // 기존 파일 업로드
    changeFiles.forEach((file, index) => {
      formData.append("changeFiles", file.element.files[0]);
    });

    // 새로 추가한 파일 업로드
    newFiles.forEach((file) => {
      formData.append("newFiles", file.element.files[0]);
    });

    // formData 엔트리 전체 조회
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    if (props.userInfo && props.userInfo.token != null) {
      fetch(`/api/board/posts/${idx}`, {
            method: "PUT",
            body: formData,
            headers: {
              "Authorization": "Bearer " + user.token,
            }
          }
      )
          .then(response => {
            if(response.status===200) {
              alert("성공");
              navigate(-1);
            }
            if(response.status===401) {
              throw new Error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            }
            if(response.status===403) {
              throw new Error("접근 권한이 없습니다.");
            }
          })
          .catch(error=>{
            alert(error.message);
          });
    } else {
      alert("로그인 후 이용해주세요");
      navigate("/login");
    }
  }

  function cancelHandler() {
    console.log(fileList);
    // 글 작성 취소 로직 실행
    const check = window.confirm("글 작성을 취소 하시겠습니까?");
    if (check) {
      navigate("/");
    }
  }

  // props 값을 사용하여 폼을 구성하고 작업을 수행합니다.
  return (
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>제목</label>
          <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 작성해주세요"
          ></input>
          <label>본문</label>
          <textarea
              row="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="본문을 작성해주세요"
          />
          <div className="file_list">
            {/* 기존 파일 목록 렌더링 */}
            {existingFiles &&
                existingFiles.map((file, idx) => (
                    <FileInput
                        key={idx}
                        file={file}
                        idx={idx}
                        selectExistingFile={selectExistingFile}
                        removeExistingFile={removeExistingFile}
                    />
                ))
            }

            {/* 새로 추가한 파일 목록 렌더링 */}
            {fileList.map((file, index) => (
                <div key={index}>
                  <div className="file_input">
                    <input
                        type="text"
                        readOnly
                        value={file ? file.name : ""}
                    />
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
                    >
                      삭제
                    </label>
                  </div>
                </div>
            ))}
          </div>
          <button
              type="button"
              onClick={addFile}
              className="btns fn_add_btn"
          >
            <span>파일 추가</span>
          </button>
          <div className="two-btn">
            <button className="btn smbtn">저장</button>
            <button
                onClick={cancelHandler}
                className="btn smbtn"
                type="button"
            >
              취소
            </button>
          </div>
        </form>
      </div>
  );
};

export default DetailEdit;
