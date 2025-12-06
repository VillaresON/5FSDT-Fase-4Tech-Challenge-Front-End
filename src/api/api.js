import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ALTERE aqui para o IP da máquina onde o backend Node está rodando
const api = axios.create({
  baseURL: "http://192.168.1.13:3000",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
