import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});
//Todo: configurar interceptores
clienteAxios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("x-token") || undefined,
  };

  return config;
});

export default clienteAxios;
