// 封装和token相关的方法 方便后面的 存 取 删
// Encapsulate token-related methods to facilitate
//  subsequent token's storage, retrieval, and deletion

const TOKENKEY = "token_key";

export function setToken(token) {
  localStorage.setItem(TOKENKEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKENKEY);
}

export function removeToken() {
  localStorage.removeItem(TOKENKEY);
}

