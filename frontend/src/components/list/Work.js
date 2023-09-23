import "./WorkCardStyles.css";
import WorkCard from "./WorkCard";
import WorkCardData from "./WorkCradData";
const Work = (props) => {
  return (
    <div className="work-container">
      <h1 className="project-heading">내가 쓴글</h1>
      <div className="project-container">
        {WorkCardData.map((val,idx)=>{
          return (
            <WorkCard 
              key={idx}
              imgsrc={val.imgsrc}
              title={val.title}
              type={val.type}
              part={val.part}
              text={val.text}
              view={val.view}
              source={val.source}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Work;
