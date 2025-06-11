import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://3.145.90.25:3100/",
});

// Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Обычно так делают
  }
  return config;
});

// Если токен невалиден — удаляем и перезагружаем страницу
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `http://3.145.90.25:3100/auth/discord?redirect=${redirectUrl}`;
      return; // Прекращаем выполнение
    }
    return Promise.reject(error);
  }
);
