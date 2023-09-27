import Header from "../components/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/Footer";
import {useTitle} from "../util/UpdateTitle";
import Detail from "../pages/board/Detail/Detail";

const BoardDetail = (props) => {
    useTitle('BoardDetail Detail');

    return (
        <div>
            <Header />
            <HeroImg2 heading="게시글 조회" text="/api/board/list/${idx}"/>
            <Detail userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
};

export default BoardDetail;