import "./BoardList.css";
import {NavLink} from "react-router-dom";

const BoardListCard = (props) => {
  return (
    <div className="project-card">
      <h2 className="project-title">
          <NavLink to={`/board/${props.id}`}>
            {props.title}
          </NavLink>
      </h2>
      <div className="pro-details">
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default BoardListCard;
