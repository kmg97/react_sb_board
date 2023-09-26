import { useEffect, useState } from "react";

export function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle);

  const updateTitle = () => {
    const htmlTitle = document.querySelector("title");

    if (title === "Home") {
      htmlTitle.innerText = "KMG's BoardDetail";
    } else if (title === "NotFound") {
      htmlTitle.innerText = "페이지를 찾을 수 없습니다.";
    } else {
      htmlTitle.innerText = `${title}-KMG's Board`;
    }
  };

  useEffect(updateTitle, [title]);
  return setTitle;
}
