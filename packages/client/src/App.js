import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import LoadingBar from "react-top-loading-bar";
import { PAGE_LOGIN, PAGE_LOGOUT, PAGE_REGISTRATION} from './common/paths';
import LoginPage from './pages/_login';

import './index.css';
import LogoutPage from './pages/_logout';
import RegistrationPage from './pages/_registration';

function App() {
  const [progress, setProgress] = useState(0);
  const pageSize = 7;
  document.body.style.backgroundColor = "#F5F5F5";
  return (
    <>
      <Router>
        <NavBar />
        <LoadingBar color="#005abb" height={3} progress={progress} />
        <Routes>
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
                  />
                }
              />
            )
          }
          <Route path={PAGE_LOGOUT} element={<LogoutPage />} />
          <Route path={PAGE_LOGIN} element={<LoginPage />} />
          <Route path={PAGE_REGISTRATION} element={<RegistrationPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
