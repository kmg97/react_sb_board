import {useTitle} from "../util/UpdateTitle";
import Header from "../commons/Header";

import Footer from "../commons/Footer";
import React from "react";
import BoardWriteVideo from "../pages/board/BoardWriteVideo";

const ChunkFiles = (props) => {
    useTitle('BoardDetail Detail Edit');

    return (
        <div>
            <Header />
            <BoardWriteVideo userInfo={props.userInfo}/>
            <Footer />
        </div>
    );
}

export default ChunkFiles;