import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Substitua pelo IP da sua máquina na rede local se estiver em dispositivo físico
// Exemplo: "http://192.168.0.100:3000"
const BASE = Constants.manifest?.extra?.BASE_URL || "http://192.168.1.66:3000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = global.authToken || (await AsyncStorage.getItem("@token"));
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("Erro ao obter token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Salvar token após login
export const setToken = async (token) => {
  global.authToken = token;
  try {
    await AsyncStorage.setItem("@token", token);
  } catch (err) {
    console.log("Erro ao salvar token:", err);
  }
};

// Remover token (logout)
export const clearToken = async () => {
  global.authToken = null;
  try {
    await AsyncStorage.removeItem("@token");
  } catch (err) {
    console.log("Erro ao remover token:", err);
  }
};

export default api;
