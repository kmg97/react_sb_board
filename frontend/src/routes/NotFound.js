import { Link } from "react-router-dom";
import { useTitle } from "../util/UpdateTitle";

const NotFound = () => {
  useTitle("NotFound");

  return (
    <div className="NotFoundPage">
      <div>
        <h1>잘못된 경로입니다.</h1>
        <br />
        <h2>버튼을 누르시면 홈 화면으로 이동됩니다.</h2>
        <Link to="/">
          <button className="btn">홈으로</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
