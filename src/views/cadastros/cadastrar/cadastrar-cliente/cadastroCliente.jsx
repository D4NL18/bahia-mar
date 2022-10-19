import React, { useState } from "react";

import InputPequeno from "../../../../components/input/input-pequeno/inputPequeno";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";
import SelectPequeno from "../../../../components/input/select-pequeno/selectPequeno";

import "./cadastroCliente.css";

function CadastroCliente() {
  const [tipoPessoa, setTipoPessoa] = useState("Física");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const [estahRegistrando, setEstahRegistrando] = useState(false);
  const options = ["Física", "Jurídica"];

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/inserir-cliente`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          isPhysicalPerson: tipoPessoa === "Física",
          name: nome,
          phone: telefone,
          cpfCnpj,
        },
        address: {
          cep,
          city: cidade,
          neighborhood: bairro,
          street: rua,
          number: numero,
          complement: complemento,
          clientCpfCnpj: cpfCnpj,
        },
      }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log((await res.json()).message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setEstahRegistrando(false));
  }

  return (
    <div className="entire-page-cadastroCliente">
      <header className="header-cadastroCliente">
        <TituloMedio title="Cadastrar Cliente" />
      </header>
      <form onSubmit={handleSubmit} className="body-cadastroCliente">
        <div className="caixa-inputs-cadastroClientes">
          <section className="coluna-inputs-cadastroCliente">
            <SelectPequeno
              state={tipoPessoa}
              setState={setTipoPessoa}
              options={options}
              label="Pessoa Física/Jurídica"
            />
            <InputPequeno
              label="Nome"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={nome}
              setState={setNome}
            />
            <InputPequeno
              label="Telefone"
              inputProps={{
                type: "tel",
                required: true,
                minLength: 10,
                maxLength: 15,
              }}
              state={telefone}
              setState={setTelefone}
            />
            <InputPequeno
              label="CPF/CNPJ"
              inputProps={{
                type: "text",
                required: true,
                minLength: 11,
                maxLength: 14,
              }}
              state={cpfCnpj}
              setState={setCpfCnpj}
            />
            <InputPequeno
              label="CEP"
              inputProps={{
                type: "text",
                required: true,
                minLength: 8,
                maxLength: 8,
              }}
              state={cep}
              setState={setCep}
            />
          </section>
          <section className="coluna-inputs-cadastroCliente">
            <InputPequeno
              label="Cidade"
              inputProps={{ type: "text", required: true, maxLength: 30 }}
              state={cidade}
              setState={setCidade}
            />
            <InputPequeno
              label="Bairro"
              inputProps={{ type: "text", required: true, maxLength: 30 }}
              state={bairro}
              setState={setBairro}
            />
            <InputPequeno
              label="Rua"
              inputProps={{ type: "text", required: true, maxLength: 30 }}
              state={rua}
              setState={setRua}
            />
            <InputPequeno
              label="Número"
              inputProps={{ type: "text", required: true, maxLength: 5 }}
              state={numero}
              setState={setNumero}
            />
            <InputPequeno
              label="Complemento"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={complemento}
              setState={setComplemento}
            />
          </section>
        </div>
        <section className="botao-cadastroCliente">
          <BotaoGrande disabled={estahRegistrando} text="Cadastrar" />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/cliente" />
    </div>
  );
}

export default CadastroCliente;
