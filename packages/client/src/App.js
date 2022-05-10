import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import LoadingBar from "react-top-loading-bar";
import Login from "./routes/Login/Login.jsx";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux"
import {  auth, getUserLogs } from "./bll/reducers/reducerUser";
// import Recommendation from "./routes/Recommendation/Recommendation";


function App() {
  
  const dispath = useDispatch()
  const [domains, setDomains] = useState("");
  const user = useSelector((state) => state.reducerUser.user)


  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      dispath(auth())
    }
  }, [])

  useEffect(()=>{
    dispath(getUserLogs(user.id)).then(()=>{
      if(localStorage.getItem("domains")){
        setDomains(localStorage.getItem("domains"))
      }
    })
  })

  const [progress, setProgress] = useState(0);
  const pageSize = 7;
  document.body.style.backgroundColor = "#F5F5F5";
  return (
    <>
        <NavBar />
        <LoadingBar color="#005abb" height={3} progress={progress} />
        <Routes>
          {
            <Route exact path="/" 
            key={uuidv4()} 
            element = {
              <News
              domains={domains ? domains: ""}
              setProgress={setProgress}
              pageSize={pageSize}
              path="/"
              />
            }
            />
          }
          {
            router.map(path =>
              <Route
                exact
                key={uuidv4()}
                path={path.path}
                element={
                  <News
                    setProgress={setProgress}
                    key={path.key}
                    category={path.category}
                    pageSize={pageSize}
                    country={path.country}
                    path={path.path}
                  />
                }
              />
            )
          }
          {
            <Route path="/login" element={<Login />}/>
          }
        </Routes>
    </>
  );
}

export default App;