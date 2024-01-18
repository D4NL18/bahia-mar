import { useState } from "react";

import InputGrande from "../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../components/botao/botao-grande/botaoGrande";
import Logo from "../../images/logo.png";

import "./login.css";
import { handleErrorBackend, login, testarLogin } from "../../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [aguardandoAsync, setAguardandoAsync] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/login/?email=${email}&password=${senha}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          handleErrorBackend(navigate, res.error);
        } else {
          // deu bom, proseguir...
          login(res);
          navigate("/menu");
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setAguardandoAsync(false));
  }

  useEffect(() => {
    testarLogin(navigate, false);
  }, [navigate]);

  return (
    <div className="entire-page-login">
      <section className="title-section-login">
        {/* <TituloGrande title="Bahia Mar" /> */}
        <img
          src={Logo}
          className="logo-login"
          alt="logo bahia mar"
          draggable="false"
        />
      </section>
      <form onSubmit={handleSubmit} className="caixa-central-section-login">
        <InputGrande
          label="E-mail"
          state={email}
          setState={setEmail}
          inputProps={{
            required: true,
            maxLength: 50,
          }}
        />
        <InputGrande
          label="Senha"
          state={senha}
          setState={setSenha}
          inputProps={{
            type: "password",
            required: true,
            minLength: 5,
            maxLength: 15,
          }}
        />
        <BotaoGrande text="Entrar" disabled={aguardandoAsync} />
        <a className="texto-redefinir-senha-login" href="/redefinir-senha">
          Esqueceu sua senha? Clique aqui para recuperá-la
        </a>
      </form>
    </div>
  );
}

export default App;
