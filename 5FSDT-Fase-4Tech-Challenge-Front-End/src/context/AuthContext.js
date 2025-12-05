import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Carrega token salvo automaticamente
    useEffect(() => {
        const loadStoredToken = async () => {
            const storedToken = await AsyncStorage.getItem("@token");

            if (storedToken) {
                setToken(storedToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            }

            setLoading(false);
        };

        loadStoredToken();
    }, []);

    // Função de login
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const tokenRecebido = response.data.token;
            const userInfo = response.data.user;

            setToken(tokenRecebido);
            setUser(userInfo);

            // salva localmente
            await AsyncStorage.setItem("@token", tokenRecebido);

            // Configura axios
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenRecebido}`;

            return true;
        } catch (error) {
            console.log("Erro no login:", error.response?.data || error.message);
            return false;
        }
    };

    // Função de logout
    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem("@token");
        delete api.defaults.headers.common["Authorization"];
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                authenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
