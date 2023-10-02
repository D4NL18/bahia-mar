import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import InputPequeno from "../../../../../components/input/input-pequeno/inputPequeno";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";
import "./registrarVenda3.css";
import { getTokenSessao } from "../../../../../services/api";

function InputQuantProduto(props) {
  const { prod, quantProdStates, setQuantProdStates } = props;

  return (
    <InputPequeno
      label={`${prod["NOME"]} (R$${prod["PRECO"].replace(".", ",")})`}
      inputProps={{ type: "text", required: true, maxLength: 8 }}
      state={quantProdStates[prod["ID"]]}
      setState={(value) => {
        const novoQuantProdStates = { ...quantProdStates };
        novoQuantProdStates[prod["ID"]] = value;
        setQuantProdStates(novoQuantProdStates);
      }}
    />
  );
}

function RegistrarVenda() {
  const navigate = useNavigate();
  const [estahRegistrando, setEstahRegistrando] = useState(false);
  const location = useLocation();
  const navigateProps = location.state;
  console.log(navigateProps);

  const [desc, setDesc] = useState("");
  const [quantPago, setQuantPago] = useState("");
  const [quantProdStates, setQuantProdStates] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);

    let total = 0;
    for (const [id, quant] of Object.entries(quantProdStates)) {
      const prod = navigateProps.produtos.find(
        (prod) => prod["ID"] === Number(id)
      );
      total += Number(prod["PRECO"]) * quant;
    }

    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/inserir-venda/${getTokenSessao()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sale: {
            ...navigateProps.ids,
            discount: Number(desc.replace(",", ".")),
            amountPaid: Number(quantPago.replace(",", ".")),
            total,
          },
          products: quantProdStates,
        }),
      }
    )
      .then((res) => res.json)
      .then(async (res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Venda cadastrada");
          navigate("/menu");
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setEstahRegistrando(false));
  }

  useEffect(() => {
    const novoQuantProdStates = {};
    for (const prod of navigateProps.produtos)
      novoQuantProdStates[prod["ID"]] = "0";

    setQuantProdStates(novoQuantProdStates);
  }, [navigateProps.produtos]);

  return (
    <div className="entire-page-registrarVenda3">
      <header className="header-registrarVenda3">
        <TituloMedio title="Cadastrar Venda" />
      </header>
      <div className="body-registrarVenda3">
        <section className="caixa-central-registrarVenda3">
          <form onSubmit={handleSubmit} className="form-registrarVenda3">
            <InputPequeno
              label="Desconto"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={desc}
              setState={setDesc}
            />
            <InputPequeno
              label="Quanto foi pago"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={quantPago}
              setState={setQuantPago}
            />
            {navigateProps.produtos.map((prod) => (
              <InputQuantProduto
                key={prod["ID"]}
                prod={prod}
                quantProdStates={quantProdStates}
                setQuantProdStates={setQuantProdStates}
              />
            ))}
            <BotaoGrande text="Cadastrar Venda" />
          </form>
        </section>
      </div>
      <BotaoVoltar path="/menu/cadastros/venda" />
    </div>
  );
}

export default RegistrarVenda;
