import React, {Suspense} from "react";
import "./index.css";
import Home from "./routes/Home";

import {Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./routes/NotFound";
import LoadingSpinner from "./ui/LoadingSpinner";
import LoginRoute from "./routes/LoginRoute";
import SignUpRoute from "./routes/SignUpRoute";
import {useAuth} from "./components/context/AuthProvider";
import BoardDetail from "./routes/BoardDetail";

const About = React.lazy(() => import("./routes/About"));
const Project = React.lazy(() => import("./routes/List"));
const Contact = React.lazy(() => import("./routes/Write"));

function App() {
    const user = useAuth().user;

    async function addContactHandler(event) {
        const response = await fetch(
            "http://localhost:8080/board",
            {
                method: "POST",
                body: JSON.stringify(event),
                headers: {
                    "Authorization": "Bearer " + user.token,
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
    }

    return (
        <>
            <Suspense
                fallback={
                    <div className="centered">
                        <LoadingSpinner/>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home"/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/board" element={<Project userInfo={user}/>}/>
                    <Route
                        path="/contact"
                        element={<Contact onAddContact={addContactHandler}/>}
                    />
                    <Route path="/login" element={<LoginRoute/>}/>
                    <Route path="/signup" element={<SignUpRoute/>}/>
                    <Route path="/board/:idx" element={<BoardDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
