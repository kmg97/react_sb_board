import pro1 from "../../assets/COSVIEW.png";
import pro2 from "../../assets/ChromeApp.png";
import pro3 from "../../assets/MovieInfo.png";
import pro4 from "../../assets/PortFolio.png";
// -> fetch 로 데이터 json으로 가져오고 파싱하기!
const ProjectCardData = [
  {
    imgsrc: pro1,
    title: "Cosview (팀)",
    type:"PC",
    part:"검색, 고객센터 및 하위메뉴",
    text: "HTML,CSS를 통한 첫 마크업 작업을 팀원과 했던 프로젝트입니다. 시멘틱 태그의 중요성과 협업의 중요성을 알 수 있는 좋은 기회였습니다.",
    view: "https://localhost:3000/ABOUT//",
    source: "https://github.com/kimmingyu0/COSVIEW"
  },
  {
    imgsrc: pro2,
    title: "ToDo List (개인)",
    type:"PC, MOBILE",
    part:"전 부분",
    text: "바닐라 자바스크립트를 이용한 기본 웹페이지 메모앱으로 이벤트 처리와 구동 원리에 대한 공부에 큰 도움이 되었습니다.",
    view: "https://localhost:3000/about/",
    source: "https://github.com/kimmingyu0/ToDoList"
  },
  {
    imgsrc: pro3,
    title: "MovieInfo (개인)",
    type:"PC, MOBILE",
    part:"전 부분",
    text: "처음 접한 리액트 프로젝트로 RestAPI를 활용하여 영화 정보를 확인 할 수 있는 웹페이지 입니다. 컴포넌트간 상호작용을 알 수 있었습니다.",
    view: "https://localhost:3000/ABOUT/",
    source: "https://github.com/kimmingyu0/MovieRanking/"
  },
  {
    imgsrc: pro4,
    title: "KMG's PortFolio (개인)",
    type:"PC, MOBILE",
    part:"전 부분",
    text: "리액트를 활용하여 만든 포트폴리오 사이트 입니다. 다양한 React hooks를 활용하였으며, 리액트를 한층 더 이해할 수 있는 기회였습니다.",
    source: "https://localhost:3000/ABOUT/"
  },
];

export default ProjectCardData;