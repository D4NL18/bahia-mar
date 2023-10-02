export const TOKEN_KEY = "&bahiamar-client-token";
export const EH_ADMIN = "&bahiamar-client-is-admin";

function resetarLocalStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EH_ADMIN);
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

export function testarLogin(navigate, deveEstarLogado = true) {
  console.log(localStorage.getItem(TOKEN_KEY));

  // entrou em uma página que precisa estar logado mas não está logado
  if (deveEstarLogado && localStorage.getItem(TOKEN_KEY) === null) {
    logout();
    navigate("/");
    return false;
  }
  // entrou em uma página que não pode estar logado mas está logado
  else if (!deveEstarLogado && localStorage.getItem(TOKEN_KEY) !== null) {
    navigate("/menu");
    return false;
  }

  return true;
}
export function testarEhAdmin(navigate) {
  /*fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/eh-admin/${getTokenSessao()}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
        logout();
        navigate("/");
      } else if (!res.isAdmin) {
        alert("Apenas admins podem acessar esta pagina");
        navigate("/menu");
      }
    });*/
  if (!getEhAdmin()) {
    alert("Apenas admins podem acessar esta página");
    navigate("/menu");
  }
}

export function getEhAdmin() {
  const val = localStorage.getItem(EH_ADMIN);
  return val ? val === "true" : false;
}
export function setEhAdmin(val) {
  localStorage.setItem(EH_ADMIN, val);
}
export function getTokenSessao() {
  return localStorage.getItem(TOKEN_KEY);
}

export function login(res) {
  localStorage.setItem(TOKEN_KEY, res.token);
  setEhAdmin(res.isAdmin);
}
export const logout = resetarLocalStorage;
