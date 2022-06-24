import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login/login'


function Router() {
    return (
      <div>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
      </div>
    );
  }
  
  export default Router;