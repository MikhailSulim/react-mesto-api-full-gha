const BASE_URL = "https://auth.nomoreparties.co";

function checkResponse(res) {
  // функция проверки ответа с сервера
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);
}

async function makeRequest(url, method, body, token) {
  // обобщённая функция запроса с сервера
  const headers = { "Content-Type": "application/json" };
  if (token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${url}`, options);
  return checkResponse(res);
}

export function register(email, password) {
  // функция отправки данных для регистрации на сервере
  return makeRequest("/signup", "POST", { email, password }, undefined);
}

export function authorize(email, password) {
  // функция отправки данных для авторизации на сервере
  return makeRequest("/signin", "POST", { email, password }, undefined);
}

export function getTokenData(token) {
  // функция отправки данных для подтверждения токена
  return makeRequest("/users/me", "GET", undefined, token);
}
