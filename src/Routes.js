import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './views/login/login'
import RedefinirSenha from './views/redefinir-senha/redefinirSenha'
import RedefinirSenha2 from './views/redefinir-senha/redefinirSenha2'


function Router() {
    return (
      <div>
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/redefinir-senha" element={<RedefinirSenha />} />
            <Route exact path="/redefinir-senha2" element={<RedefinirSenha2 />} />
        </Routes>
    </BrowserRouter>
      </div>
    );
  }
  
  export default Router;