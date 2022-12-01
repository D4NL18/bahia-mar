import React, { useState } from "react";

import InputPequeno from "../../../../components/input/input-pequeno/inputPequeno";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";
import SelectPequeno from "../../../../components/input/select-medio/selectMedio";

import "./cadastroCliente.css";
import { useLocation } from "react-router-dom";

function CadastroCliente() {
  const location = useLocation();
  const estahRegistrando = !location.state;
  console.log(location.state);

  const [tipoPessoa, setTipoPessoa] = useState(
    estahRegistrando
      ? "Física"
      : location.state["EH_PESSOA_FISICA"] === 1
      ? "Física"
      : "Jurídica"
  );
  const [nome, setNome] = useState(
    estahRegistrando ? "" : location.state["NOME"]
  );
  const [telefone, setTelefone] = useState(
    estahRegistrando ? "" : location.state["TELEFONE"]
  );
  const [cpfCnpj, setCpfCnpj] = useState(
    estahRegistrando ? "" : location.state["CPF_CNPJ"]
  );
  const [cep, setCep] = useState(estahRegistrando ? "" : location.state["CEP"]);
  const [cidade, setCidade] = useState(
    estahRegistrando ? "" : location.state["CIDADE"]
  );
  const [bairro, setBairro] = useState(
    estahRegistrando ? "" : location.state["BAIRRO"]
  );
  const [rua, setRua] = useState(estahRegistrando ? "" : location.state["RUA"]);
  const [numero, setNumero] = useState(
    estahRegistrando ? "" : location.state["NUMERO"]
  );
  const [complemento, setComplemento] = useState(
    estahRegistrando ? "" : location.state["COMPLEMENTO"]
  );

  const [aguardandoAsync, setAguardandoAsync] = useState(false);
  const options = ["Física", "Jurídica"];

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    const path = estahRegistrando
      ? "inserir-cliente"
      : "editar-cliente-e-endereco";
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          id: estahRegistrando ? undefined : location.state["ID"],
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
          clientId: estahRegistrando ? undefined : location.state["ID"],
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
      .finally(() => setAguardandoAsync(false));
  }

  return (
    <div className="entire-page-cadastroCliente">
      <header className="header-cadastroCliente">
        <TituloMedio
          title={`${estahRegistrando ? "Cadastrar" : "Editar"} Cliente`}
        />
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
                maxLength: 11,
              }}
              state={telefone}
              setState={setTelefone}
            />
            <InputPequeno
              label="CPF/CNPJ"
              inputProps={{
                type: "text",
                required: true,
                minLength: tipoPessoa === "Física" ? 11 : 14,
                maxLength: tipoPessoa === "Física" ? 11 : 14,
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
          <BotaoGrande
            disabled={aguardandoAsync}
            text={`${estahRegistrando ? "Cadastrar" : "Editar"}`}
          />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/cliente" />
    </div>
  );
}

export default CadastroCliente;
