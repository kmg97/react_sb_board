import Header from "../components/Header";
import HeroImg2 from "../components/HeroImg2";
import Footer from "../components/Footer";
import {useTitle} from "../util/UpdateTitle";
import DetailEdit from "../pages/board/DetailEdit";

const BoardEdit = (props) => {
    useTitle('Board Detail Edit');

    return (
        <div>
            <Header />
            <HeroImg2 heading="게시글 수정" text="Edit Page"/>
            <DetailEdit userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
};

export default BoardEdit;