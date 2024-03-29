import { useEffect, useState } from "react";

import Select from "../../../../../components/input/select/select";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda.css";
import { useNavigate } from "react-router-dom";
import {
  getEhAdmin,
  getTokenSessao,
  logout,
  testarLogin,
} from "../../../../../services/api";

function RegistrarVenda() {
  const ehAdmin = getEhAdmin();

  const navigate = useNavigate();
  const [info, setInfo] = useState();

  const [funcionario, setFuncionario] = useState("Selecionar");
  const [veiculo, setVeiculo] = useState("Selecionar");
  const [cliente, setCliente] = useState("Selecionar");
  const [metodoPagamento, setMetodoPagamento] = useState("Selecionar");

  useEffect(() => {
    if (!testarLogin(navigate)) return;

    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/vendas/obter-info-cadastro-venda/${getTokenSessao()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const jsonRes = await res.json();
      if (jsonRes.error) {
        alert(jsonRes.error);
        logout();
        navigate("/");
      } else {
        console.log(jsonRes);
        setInfo(jsonRes);
      }
    });
  }, [navigate]);

  function isNextButtonDisabled() {
    return (
      funcionario === "Selecionar" ||
      veiculo === "Selecionar" ||
      cliente === "Selecionar" ||
      metodoPagamento === "Selecionar"
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      funcionario !== "Selecionar" &&
      veiculo !== "Selecionar" &&
      cliente !== "Selecionar" &&
      metodoPagamento !== "Selecionar"
    )
      navigate("/menu/cadastros/venda3", {
        state: {
          ids: {
            employeeId: info.employees.find(
              (emp) => emp["CPF"] === funcionario.split(" - ")[1]
            )["ID"],
            vehicleId: info.vehicles.find(
              (veic) => veic["PLACA"] === veiculo.split(" - ")[1]
            )["ID"],
            clientId: info.clients.find(
              (cli) => cli["CPF_CNPJ"] === cliente.split(" - ")[1]
            )["ID"],
            paymentMethodId: info.paymentMethods.find(
              (paym) => paym["NOME"] === metodoPagamento
            )["ID"],
          },
          produtos: info.products,
        },
      });
  }

  return (
    <div className="entire-page-registrarVenda">
      <header className="header-registrarVenda">
        <TituloMedio title={info ? "Cadastrar Venda" : "Obtendo dados"} />
      </header>
      {info && (
        <div className="body-registrarVenda">
          <section className="caixa-central-registrarVenda">
            <form onSubmit={handleSubmit} className="form-registrarVenda">
              <Select
                state={funcionario}
                setState={setFuncionario}
                options={["Selecionar"].concat(
                  info.employees.map(
                    (func) => `${func["NOME"]} - ${func["CPF"]}`
                  )
                )}
                label="Funcionário"
              />
              <Select
                state={veiculo}
                setState={setVeiculo}
                options={["Selecionar"].concat(
                  info.vehicles.map(
                    (veiculo) => `${veiculo["MARCA"]} - ${veiculo["PLACA"]}`
                  )
                )}
                label="Veículo"
              />
              <Select
                state={cliente}
                setState={setCliente}
                options={["Selecionar"].concat(
                  info.clients.map(
                    (cliente) => `${cliente["NOME"]} - ${cliente["CPF_CNPJ"]}`
                  )
                )}
                label="Cliente"
              />
              <Select
                state={metodoPagamento}
                setState={setMetodoPagamento}
                options={["Selecionar"].concat(
                  info.paymentMethods.map((i) => i["NOME"])
                )}
                label="Forma de Pagamento"
              />
              <BotaoGrande
                text="Seguir"
                {
                  ...{} /*path="/menu/cadastros/venda2"*/
                }
                disabled={isNextButtonDisabled()}
              />
            </form>
          </section>
        </div>
      )}
      <BotaoVoltar path={ehAdmin ? "/menu/cadastros" : "/menu"} />
    </div>
  );
}

export default RegistrarVenda;
