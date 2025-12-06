import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storedUser = await AsyncStorage.getItem("user");
      const storedToken = await AsyncStorage.getItem("token");

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      }
      setLoading(false);
    }
    loadStorage();
  }, []);

  // ✅ LOGIN AGORA RECEBE TYPE
  async function login(email, password, type) {
    const res = await api.post("/auth/login", {
      email,
      password,
      type, // ✅ AGORA ENVIA
    });

    const { token, user } = res.data;

    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("token", token);

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setUser(user);
  }

  async function logout() {
    await AsyncStorage.clear();
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.isAdmin,
        isTeacher: user?.type === "teacher",
        isStudent: user?.type === "student",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
