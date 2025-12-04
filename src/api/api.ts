// src/api/api.ts
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const getBaseURL = () => {
  // exemplo simples: assume Android emulator AVD por padrão
  if (Platform.OS === "android") return "http://10.0.2.2:4000";
  return "http://localhost:3000";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 12000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Erro lendo token do AsyncStorage", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
