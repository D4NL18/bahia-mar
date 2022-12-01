export const TOKEN_KEY = "&bahiamar-client-token";
export const USUARIO_LOGADO = "&bahiamar-client-logged-user";

export async function testarLogin(navigate, deveEstarLogado = true) {
  console.log(localStorage.getItem(TOKEN_KEY));
  console.log(localStorage.getItem(USUARIO_LOGADO));

  // entrou em uma página que precisa estar logado mas não está logado
  if (deveEstarLogado && localStorage.getItem(TOKEN_KEY) === null)
    navigate("/");
  // entrou em uma página que não pode estar logado mas está logado
  else if (!deveEstarLogado && localStorage.getItem(TOKEN_KEY) !== null)
    navigate("/menu");
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
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USUARIO_LOGADO);
}
