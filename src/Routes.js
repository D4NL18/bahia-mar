import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/login/login";
import RedefinirSenha from "./views/login/redefinir-senha/redefinirSenha";
import RedefinirSenha2 from "./views/login/redefinir-senha/redefinirSenha2";
import Menu from "./views/menu/menu";
import Gerenciamento from "./views/gerenciamento/menu-gerenciamento/gerenciamento";
import Vendas from "./views/gerenciamento/vendas/vendas";
import Clientes from "./views/gerenciamento/clientes/clientes";
import PerfilCliente from "./views/gerenciamento/clientes/perfilCliente/perfilCliente";
import PerfilFuncionario from "./views/gerenciamento/funcionarios/perfilFuncionario";
import Funcionario from "./views/gerenciamento/funcionarios/funcionarios";
import Estoque from "./views/gerenciamento/estoque/estoque";
import Precos from "./views/gerenciamento/precos/precos";
import Cadastros from "./views/cadastros/menu-cadastros/cadastros";
import MenuCrud from "./views/cadastros/menus-CRUD/menuCrud";
import MenuFuncionarios from "./views/cadastros/menu-funcionarios/menuColaborador";
import CadastroAdm from "./views/cadastros/cadastrar/cadastrar-adm/cadastroAdm";
import CadastroCliente from "./views/cadastros/cadastrar/cadastrar-cliente/cadastroCliente";
import CadastroMotorista from "./views/cadastros/cadastrar/cadastrar-motorista/cadastroMotorista";
import CadastroVeiculo from "./views/cadastros/cadastrar/cadastrar-veiculo/cadastroVeiculo";
import CadastroVenda from "./views/cadastros/cadastrar/registrar-venda/registrarVenda1/registrarVenda";
import CadastroVenda2 from "./views/cadastros/cadastrar/registrar-venda/registrarVenda2/registrarVenda2";
import CadastroVenda3 from "./views/cadastros/cadastrar/registrar-venda/registrarVenda3/registrarVenda3";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route
            exact
            path="/redefinir-senha/nova-senha/:token"
            element={<RedefinirSenha2 />}
          />
          <Route
            exact
            path="/menu/gerenciamento/funcionarios"
            element={<Funcionario />}
          />
          <Route
            exact
            path="/menu/gerenciamento/funcionarios/:id"
            element={<PerfilFuncionario />}
          />
          <Route exact path="/menu" element={<Menu />} />
          <Route exact path="/menu/gerenciamento" element={<Gerenciamento />} />
          <Route exact path="/menu/gerenciamento/vendas" element={<Vendas />} />
          <Route
            exact
            path="/menu/gerenciamento/estoque"
            element={<Estoque />}
          />
          <Route exact path="/menu/gerenciamento/precos" element={<Precos />} />
          <Route
            exact
            path="/menu/gerenciamento/clientes"
            element={<Clientes />}
          />

          <Route
            exact
            path="/menu/gerenciamento/clientes/:id"
            element={<PerfilCliente />}
          />
          <Route exact path="/menu/cadastros" element={<Cadastros />} />
          <Route
            exact
            path="/menu/cadastros/colaborador"
            element={<MenuFuncionarios />}
          />
          <Route
            exact
            path="/menu/cadastros/colaborador/administrador"
            element={
              <MenuCrud
                tipo="funcionarios"
                titulo="Administradores"
                rotulo="Administrador"
              />
            }
          />
          <Route
            exact
            path="/menu/cadastros/colaborador/administrador/cadastrar"
            element={<CadastroAdm />}
          />
          <Route
            exact
            path="/menu/cadastros/colaborador/funcionario"
            element={
              <MenuCrud
                tipo="funcionarios"
                titulo="Funcionários"
                rotulo="Funcionário"
              />
            }
          />
          <Route
            exact
            path="/menu/cadastros/colaborador/funcionario/cadastrar"
            element={<CadastroMotorista />}
          />
          <Route
            exact
            path="/menu/cadastros/veiculo"
            element={
              <MenuCrud tipo="veiculos" titulo="Veículos" rotulo="Veículo" />
            }
          />
          <Route
            exact
            path="/menu/cadastros/veiculo/cadastrar"
            element={<CadastroVeiculo />}
          />
          <Route
            exact
            path="/menu/cadastros/cliente"
            element={
              <MenuCrud tipo="clientes" titulo="Clientes" rotulo="Cliente" />
            }
          />
          <Route
            exact
            path="/menu/cadastros/cliente/cadastrar"
            element={<CadastroCliente />}
          />
          <Route
            exact
            path="/menu/cadastros/venda"
            element={<CadastroVenda />}
          />
          <Route
            exact
            path="/menu/cadastros/venda2"
            element={<CadastroVenda2 />}
          />
          <Route
            exact
            path="/menu/cadastros/venda3"
            element={<CadastroVenda3 />}
          />
          <Route
            exact
            path="/menu/cadastros/produto"
            element={
              <MenuCrud tipo="produtos" titulo="Produtos" rotulo="Produto" />
            }
          />
          <Route
            exact
            path="/menu/cadastros/metodo"
            element={
              <MenuCrud
                tipo="opcoes-pag"
                titulo="Opções de Pagamento"
                rotulo="Opção de Pagamento"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
