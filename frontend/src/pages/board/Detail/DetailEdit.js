import "./DetailEdit.css";

import React, { useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const DetailEdit = (props) => {
  const location = useLocation();
  const { idx } = useParams();

  // location의 state 값을 확인
  const state = location.state;
  const [title,setTitle] = useState(state.props.title);
  const [username,setUsername] = useState(state.props.username);
  const [content,setContent] = useState(state.props.content);
  const navigate = useNavigate();

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

  function submitHandler(event) {
    event.preventDefault();

    const updateData= {
      title : title,
      username: username,
      content: content
    }

    if (props.userInfo && props.userInfo.token != null) {

      fetch(`http://localhost:8080/api/board/edit/${idx}`, {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: {
          "Authorization": "Bearer " + props.userInfo.token,
          "Content-Type": "application/json",
        }
      })
          .then(response => {
            console.log(response)
          })
          .catch(error=>{
            alert("API 호출 오류");
          })
    } else {
      alert("로그인 후 이용해주세요");
      navigate("/login");
    }
  }

  function cancelHandler() {
    navigate(-1);
  }

  // props 값을 사용하여 폼을 구성하고 작업을 수행합니다.
  return (
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>제목</label>
          <input
              type="text"
              value={title}
              placeholder="제목을 작성해주세요"
              onChange={(e)=>setTitle(e.target.value)}
          ></input>
          <label>연락처</label>
          <input
              type="text"
              value={username}
              placeholder="이메일 또는 전화번호를 작성해주세요"
              onChange={(e)=>setUsername(e.target.value)}
          ></input>
          <label>남기실 말씀</label>
          <textarea
              row="6"
              value={content}
              placeholder="남기실 말씀을 작성해주세요"
              onChange={(e)=>setContent(e.target.value)}
          />
          <div className="two-btn">
            <button className="btn smbtn">저장</button>
            <button onClick={cancelHandler} className="btn smbtn" type="button">취소</button>
          </div>
        </form>
      </div>
  );
};

export default DetailEdit;
