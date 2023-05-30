import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={setProgress}
                pageSize={6}
                country="in"
                category="General"
              />
            }
          ></Route>
          <Route
            path="/About"
            element={
              <News
                setProgress={setProgress}
                pageSize={6}
                country="in"
                category="About"
              />
            }
          ></Route>
          <Route
            path="/Entertainment"
            element={
              <News
                setProgress={setProgress}
                key="Entertainment"
                pageSize={6}
                country="in"
                category="Entertainment"
              />
            }
          ></Route>
          <Route
            path="/General"
            element={
              <News
                setProgress={setProgress}
                key="General"
                pageSize={6}
                country="in"
                category="General"
              />
            }
          >
            {" "}
          </Route>
          <Route
            path="/Health"
            element={
              <News
                setProgress={setProgress}
                key="Health"
                pageSize={6}
                country="in"
                category="Health"
              />
            }
          ></Route>
          <Route
            path="/Science"
            element={
              <News
                setProgress={setProgress}
                key="Science"
                pageSize={6}
                country="in"
                category="Science"
              />
            }
          ></Route>
          <Route
            path="/Sports"
            element={
              <News
                setProgress={setProgress}
                key="Sports"
                pageSize={6}
                country="in"
                category="Sports"
              />
            }
          ></Route>
          <Route
            path="/Technology"
            element={
              <News
                setProgress={setProgress}
                key="Technology"
                pageSize={6}
                country="in"
                category="Technology"
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* <News setProgress={setProgress} pageSize={6} country='in' category='sports' /> */}
    </>
  );
};
export default App;
