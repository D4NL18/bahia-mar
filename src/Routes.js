import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/login";
import RedefinirSenha from "./views/login/redefinir-senha/redefinirSenha";
import RedefinirSenha2 from "./views/login/redefinir-senha/redefinirSenha2";
import Menu from "./views/menu/menu";
import Gerenciamento from "./views/gerenciamento/menu-gerenciamento/gerenciamento";
import Cadastros from "./views/cadastros/menu-cadastros/cadastros";
import MenuCrud from './views/cadastros/menus-CRUD/menuCrud'
import MenuFuncionarios from './views/cadastros/menu-funcionarios/menuFuncionarios'
import CadastroAdm from './views/cadastros/cadastrar/cadastrar-adm/cadastroAdm'
import CadastroMotorista from './views/cadastros/cadastrar/cadastrar-motorista/cadastroMotorista'
import CadastroVeiculo from './views/cadastros/cadastrar/cadastrar-veiculo/cadastroVeiculo'
import CadastroVenda from './views/cadastros/cadastrar/registrar-venda/registrarVenda'

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

          <Route exact path="/menu/cadastros" element={<Cadastros />} />

          <Route exact path="/menu/cadastros/funcionario" element={<MenuFuncionarios/>} />

          <Route exact path="/menu/cadastros/funcionario/administrador" element={<MenuCrud tipo="Administrador" />} />
          <Route exact path="/menu/cadastros/funcionario/administrador/cadastrar" element={<CadastroAdm/>} />

          <Route exact path="/menu/cadastros/funcionario/motorista" element={<MenuCrud tipo="Motorista" />} />
          <Route exact path="/menu/cadastros/funcionario/motorista/cadastrar" element={<CadastroMotorista/>} />

          <Route exact path="/menu/cadastros/veiculo" element={<MenuCrud tipo="Veiculo" />} />
          <Route exact path="/menu/cadastros/veiculo/cadastrar" element={<CadastroVeiculo/>} />
 
          <Route exact path="/menu/cadastros/produto" element={<MenuCrud tipo="Produto" />} />

          <Route exact path="/menu/cadastros/cliente" element={<MenuCrud tipo="Cliente" />} />

          <Route exact path="/menu/cadastros/venda" element={<CadastroVenda/>} />
          

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
