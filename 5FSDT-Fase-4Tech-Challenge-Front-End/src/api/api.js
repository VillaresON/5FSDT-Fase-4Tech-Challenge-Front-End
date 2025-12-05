import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Base URL do backend
// Substitua pelo IP da sua máquina se estiver usando em dispositivo físico
const BASE = Constants.manifest?.extra?.BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      // Tenta pegar token de global ou AsyncStorage
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

// Função auxiliar para salvar token após login
export const setToken = async (token) => {
  global.authToken = token;
  try {
    await AsyncStorage.setItem("@token", token);
  } catch (err) {
    console.log("Erro ao salvar token no AsyncStorage:", err);
  }
};

// Função auxiliar para remover token (logout)
export const clearToken = async () => {
  global.authToken = null;
  try {
    await AsyncStorage.removeItem("@token");
  } catch (err) {
    console.log("Erro ao remover token do AsyncStorage:", err);
  }
};

export default api;
