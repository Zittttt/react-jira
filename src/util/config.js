import axios from "axios";

export const DOMAIN = "https://jiranew.cybersoft.edu.vn/";
export const CYBERSOFT_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNiIsIkhldEhhblN0cmluZyI6IjA4LzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2Nzg2NTYwMDAwMCIsIm5iZiI6MTYzNzY4NjgwMCwiZXhwIjoxNjY4MDEzMjAwfQ.QkTkDXeVpyqSwqxo_HmH-aQhbITi8vZC_UPJ7cPM3W4";
export const TOKEN = "access_token";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});



http.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = "Bearer " + localStorage.getItem(TOKEN);
    config.headers = {
      ...config.headers,
      TokenCybersoft: CYBERSOFT_TOKEN,
      Authorization: ACCESS_TOKEN,
    };
    return config;
  },
  (errors) => {
    return Promise.reject({ errors });
  }
);
