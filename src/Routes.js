import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/login";
import RedefinirSenha from "./views/redefinir-senha/redefinirSenha";
import RedefinirSenha2 from "./views/redefinir-senha/redefinirSenha2";
import Menu from "./views/menu/menu";
import Gerenciamento from "./views/menu-gerenciamento/gerenciamento";
import Cadastros from "./views/menu-cadastros/cadastros";
import MenuCrud from './views/menus-CRUD/menuCrud'
import VendasDia from './views/vendas-dia/vendasDia'
import CadastroAdm from './views/cadastros/cadastrar-adm/cadastroAdm'
import CadastroMotorista from './views/cadastros/cadastrar-motorista/cadastroMotorista'
import CadastroVeiculo from './views/cadastros/cadastrar-veiculo/cadastroVeiculo'

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route 
          exact path="/" element={<Login />} />
          <Route exact path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route exact path="/redefinir-senha/nova-senha" element={<RedefinirSenha2 />}
          />
          <Route exact path="/menu" element={<Menu />} />

          <Route exact path="/menu/gerenciamento" element={<Gerenciamento />} />
          <Route exact path="/menu/gerenciamento/vendas-dia" element={<VendasDia />} />

          <Route exact path="/menu/cadastros" element={<Cadastros />} />

          <Route exact path="/menu/cadastros/administrador" element={<MenuCrud tipo="Administrador" />} />
          <Route exact path="/menu/cadastros/administrador/cadastrar" element={<CadastroAdm/>} />

          <Route exact path="/menu/cadastros/motorista" element={<MenuCrud tipo="Motorista" />} />
          <Route exact path="/menu/cadastros/motorista/cadastrar" element={<CadastroMotorista/>} />

          <Route exact path="/menu/cadastros/veiculo" element={<MenuCrud tipo="Veículo" />} />
          <Route exact path="/menu/cadastros/veiculo/cadastrar" element={<CadastroVeiculo/>} />
 
          <Route exact path="/menu/cadastros/produto" element={<MenuCrud tipo="Produto" />} />

          <Route exact path="/menu/cadastros/cliente" element={<MenuCrud tipo="Cliente" />} />
          

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
