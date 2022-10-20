import React, { useState } from "react";

import InputPequeno from "../../../../../components/input/input-pequeno/inputPequeno";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda2.css";



function RegistrarVenda() {

  const [nome, setNome] = useState("")
  const [tel, setTel] = useState("")
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [num, setNum] = useState("")
  const [bairro, setBairro] = useState("")

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
                <InputPequeno
                  label="Nome Completo"
                  inputProps={{ type: "text", required: true, maxLength: 50 }}
                  state={nome}
                  setState={setNome}
                />
                <InputPequeno
                  label="Telefone"
                  inputProps={{ type: "tel", required: true, maxLength: 11 }}
                  state={tel}
                  setState={setTel}
                />
                <InputPequeno
                  label="CEP"
                  inputProps={{ type: "text", required: true, maxLength: 50 }}
                  state={cep}
                  setState={setCep}
                />
              </section>
              <section className="coluna-inputs-registrarVenda2">
                <InputPequeno
                  label="Rua"
                  inputProps={{ type: "text", required: true, maxLength: 50 }}
                  state={rua}
                  setState={setRua}
                />
                <InputPequeno
                  label="Número"
                  inputProps={{ type: "text", required: true, maxLength: 50 }}
                  state={num}
                  setState={setNum}
                />
                <InputPequeno
                  label="Bairro"
                  inputProps={{ type: "text", required: true, maxLength: 50 }}
                  state={bairro}
                  setState={setBairro}
                />
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
