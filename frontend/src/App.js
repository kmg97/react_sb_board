import React, { Suspense } from "react";
import "./index.css";
import Home from "./routes/Home";

import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./routes/NotFound";
import LoadingSpinner from "./ui/LoadingSpinner";
import LoginRoute from "./routes/LoginRoute";
import SignUpRoute from "./routes/SignUpRoute";
import {AuthProvider} from "./components/context/AuthProvider";

const About = React.lazy(() => import("./routes/About"));
const Project = React.lazy(() => import("./routes/Project"));
const Contact = React.lazy(() => import("./routes/Contact"));

function App() {
  async function addContactHandler(event) {
    const response = await fetch(
      "https://react-http-6ede3-default-rtdb.firebaseio.com/contacts.json",
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
          <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route
            path="/contact"
            element={<Contact onAddContact={addContactHandler} />}
          />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/signup" element={<SignUpRoute />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
          </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
