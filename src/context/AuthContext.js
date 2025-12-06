import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import api from "../api/api";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      const msg =
        err.response?.data?.error ||
        "Não foi possível fazer login. Verifique suas credenciais.";
      Alert.alert("Erro no login", msg);
      throw err;
    }
  }

  async function logout() {
    await AsyncStorage.clear();
    setUser(null);
    Alert.alert("Até logo", "Você saiu do sistema.");
  }

  const role = user?.role || (user?.isAdmin ? "admin" : user ? "teacher" : null);
  const isAdmin = role === "admin";
  const isTeacher =
    role === "teacher" || role === "professor" || role === "docente" || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isTeacher,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
