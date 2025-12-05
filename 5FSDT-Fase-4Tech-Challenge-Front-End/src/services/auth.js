import api, { setToken } from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data.token) {
      await setToken(response.data.token); // salva token para futuras requisições
      return { success: true, token: response.data.token };
    }

    return { success: false, error: "Token não recebido do servidor" };
  } catch (err) {
    console.log("Erro no login:", err.response?.data || err.message);
    return { success: false, error: err.response?.data?.error || "Erro ao logar" };
  }
};
