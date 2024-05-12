import http from "./httpService";

const apiEndPoint = process.env.REACT_APP_API_URL + "/api/AuthenticateUser";
const tokenKey = "MAROON_TOKEN";

export async function login(email: string, password: string) {
  return http.post(apiEndPoint, {
    email,
    password,
  });
}

export function loginWithJwt(jwt: string) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  if (localStorage.getItem(tokenKey)) {
    localStorage.removeItem(tokenKey);
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getJwt,
};
