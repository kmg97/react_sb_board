import Header from "../components/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/Footer";
import {useTitle} from "../util/UpdateTitle";
import DetailEdit from "../pages/board/Detail/DetailEdit";

const BoardEdit = (props) => {
    useTitle('BoardDetail Detail Edit');

    return (
        <div>
            <Header />
            <HeroImg2 heading="Edit" text="게시글 수정"/>
            <DetailEdit userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
};

export default BoardEdit;