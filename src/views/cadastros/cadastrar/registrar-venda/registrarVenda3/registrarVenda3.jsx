import React from "react";

import InputPequeno from "../../../../../components/input/input-pequeno/inputPequeno";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda3.css";



function RegistrarVenda() {
  const produtos = ['Produto 1', 'Produto 2', 'Produto 3']
  return (
    <div className="entire-page-registrarVenda3">
      <header className="header-registrarVenda3">
        <TituloMedio title="Cadastrar Venda" />
      </header>
      <body className="body-registrarVenda3">
        <section className="caixa-central-registrarVenda3">
          <form className="form-registrarVenda3">
            <InputPequeno label="Desconto" />
            <InputPequeno label="Quanto foi pago" />
            {
                produtos.map((prod, key) =>
                    <InputPequeno key={key} label={prod}/>)
            }
            <BotaoGrande text="Cadastrar Venda" path="/menu/cadastros/venda" />
          </form>
        </section>
      </body>
      <BotaoVoltar />
    </div>
  );
}

export default RegistrarVenda;
