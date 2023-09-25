export const TOKEN_KEY = "&bahiamar-client-token";
export const USUARIO_LOGADO = "&bahiamar-client-logged-user";

function resetarLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USUARIO_LOGADO);
}

export async function tokenEhValido(token, route = "validar-jwt") {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/${route}/${token}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const { error } = response;
        // deu ruim
        if (error) {
          console.error(error);
          alert(error);
        }

        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export async function testarLogin(navigate, deveEstarLogado = true) {
  console.log(localStorage.getItem(TOKEN_KEY));
  console.log(localStorage.getItem(USUARIO_LOGADO));

  // entrou em uma página que precisa estar logado mas não está logado
  if (deveEstarLogado) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token === null || !(await tokenEhValido(token))) {
      resetarLocalStorage();
      navigate("/");
      return false;
    }
  }
  // entrou em uma página que não pode estar logado mas está logado
  else if (!deveEstarLogado && localStorage.getItem(TOKEN_KEY) !== null) {
    navigate("/menu");
    return false;
  }

  return true;
}

export function getUsuarioLogado() {
  const val = localStorage.getItem(USUARIO_LOGADO);
  return val ? JSON.parse(val) : null;
}
export function setUsuarioLogado(usuarioObj) {
  localStorage.setItem(USUARIO_LOGADO, JSON.stringify(usuarioObj));
}

export function login(res) {
  localStorage.setItem(TOKEN_KEY, res.token);
  setUsuarioLogado(res.loggedUser);
}
export const logout = resetarLocalStorage;
