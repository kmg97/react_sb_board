import "./WorkCardStyles.css";
import {NavLink} from "react-router-dom";

const WorkCard = (props) => {
  return (
    <div className="project-card">
      <img src={props.imgsrc} alt="project" />
      <h2 className="project-title">
          <NavLink to="/about" >
            {props.title}
          </NavLink>
      </h2>
      <div className="pro-details">
        <h3>최적화 : {props.type}</h3>
        <h3>참여 : {props.part}</h3>
        <p>{props.text}</p>
        <div className="pro-btns">
            <NavLink to="/about" className="btn">수정</NavLink>
          <a href={props.source} target="_blank" rel="noopener noreferrer" className="btn">
            삭제
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkCard;
