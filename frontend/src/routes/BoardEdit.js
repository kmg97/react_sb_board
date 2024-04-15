import Header from "../commons/Header";
import DescripHeader from "../commons/DescripHeader";
import Footer from "../commons/Footer";
import {useTitle} from "../util/UpdateTitle";
import DetailEdit from "../pages/board/Detail/DetailEdit";

const BoardEdit = (props) => {
    useTitle('BoardDetail Detail Edit');

    return (
        <div>
            <Header />
            <DescripHeader heading="Edit" text="게시글 수정"/>
            <DetailEdit userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
};

export default BoardEdit;