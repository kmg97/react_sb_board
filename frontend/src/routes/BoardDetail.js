import Header from "../commons/Header";
import DescripHeader from "../commons/DescripHeader";
import Footer from "../commons/Footer";
import {useTitle} from "../util/UpdateTitle";
import Detail from "../pages/board/Detail/Detail";

const BoardDetail = (props) => {
    useTitle('BoardDetail Detail');

    return (
        <div>
            <Header />
            <DescripHeader heading="Detail" text="게시글 상세 조회"/>
            <Detail userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
};

export default BoardDetail;