// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export type User = {
  id: number;
  name?: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUserFromStorage: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // restaura token + user ao iniciar o app
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userJson = await AsyncStorage.getItem("user");
        if (token) {
          if (userJson) {
            // se houver user salvo, restaura
            setUser(JSON.parse(userJson));
          } else {
            // opcional: busca /auth/me para validar token e recuperar user
            try {
              const resp = await api.get("/auth/me");
              if (resp?.data) {
                setUser(resp.data);
                await AsyncStorage.setItem("user", JSON.stringify(resp.data));
              }
            } catch (err) {
              // token inválido ou endpoint não disponível -> limpa
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("user");
              setUser(null);
            }
          }
        }
      } catch (err) {
        console.warn("Erro restaurando auth:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // login: chama backend, guarda token e user
  const login = async (email: string, password: string) => {
    const resp = await api.post("/auth/login", { email, password });
    const { token, user: userFromServer } = resp.data;
    // salva token + user
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(userFromServer));
    setUser(userFromServer);
  };

  // logout: limpa storage e estado
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const setUserFromStorage = (u: User | null) => {
    setUser(u);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUserFromStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
