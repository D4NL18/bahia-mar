import React from "react";

import Select from '../../../../../components/input/select/select'
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda.css";



function RegistrarVenda() {
  const funcionarios = ['Selecionar','a', 'b', 'c']
  return (
    <div className="entire-page-registrarVenda">
      <header className="header-registrarVenda">
        <TituloMedio title="Cadastrar Venda" />
      </header>
      <body className="body-registrarVenda">
        <section className="caixa-central-registrarVenda">
          <form className="form-registrarVenda">
            <Select options={funcionarios} label="Funcionário" />
            <Select options={funcionarios} label="Veículo"/>
            <Select options={funcionarios} label="Cliente"/>
            <Select options={funcionarios} label="Forma de Pagamento"/>
            <BotaoGrande text="Seguir" path="/menu/cadastros/venda2" />
          </form>
        </section>
      </body>
      <BotaoVoltar />
    </div>
  );
}

export default RegistrarVenda;
