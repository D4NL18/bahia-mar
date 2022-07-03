import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/login";
import RedefinirSenha from "./views/redefinir-senha/redefinirSenha";
import RedefinirSenha2 from "./views/redefinir-senha/redefinirSenha2";
import Menu from "./views/menu/menu";
import Estatisticas from "./views/estatisticas/estatisticas";
import Cadastros from "./views/cadastros/cadastros";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route
            exact
            path="/redefinir-senha/nova-senha"
            element={<RedefinirSenha2 />}
          />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/menu/estatisticas" element={<Estatisticas />} />
          <Route exact path="/menu/cadastros" element={<Cadastros />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
