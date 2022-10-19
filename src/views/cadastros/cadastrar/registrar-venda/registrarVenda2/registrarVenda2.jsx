import React from "react";

import InputPequeno from "../../../../../components/input/input-pequeno/inputPequeno";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda2.css";



function RegistrarVenda() {
  return (
    <div className="entire-page-registrarVenda2">
      <header className="header-registrarVenda2">
        <TituloMedio title="Cadastrar Venda" />
      </header>
      <body className="body-registrarVenda2">
        <section className="caixa-central-registrarVenda2">
          <form className="form-registrarVenda2">
            <section className="caixa-inputs-registrarVenda2">
              <section className="coluna-inputs-registrarVenda2">
                <InputPequeno label="Nome Completo" />
                <InputPequeno label="Telefone" />
                <InputPequeno label="CEP" />
              </section>
              <section className="coluna-inputs-registrarVenda2">
                <InputPequeno label="Rua" />
                <InputPequeno label="Número" />
                <InputPequeno label="Bairro" />
              </section>
            </section>
            <BotaoGrande text="Seguir" path="/menu/cadastros/venda3" />
          </form>
        </section>
      </body>
      <BotaoVoltar path="/menu/cadastros/venda" />
    </div>
  );
}

export default RegistrarVenda;
