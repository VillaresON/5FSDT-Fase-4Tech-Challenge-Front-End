import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { colors, spacing } from "../styles/theme";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("admin@escola.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Informe email e senha.");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Card>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: spacing.md }}>
            Portal Acadêmico
          </Text>

          <Text style={{ marginBottom: 4 }}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
              borderRadius: 8,
              marginBottom: spacing.sm,
            }}
          />

          <Text style={{ marginBottom: 4 }}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              padding: 10,
              borderRadius: 8,
              marginBottom: spacing.md,
            }}
          />

          <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} />

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: spacing.md }}
          >
            <Text style={{ color: colors.primary, textAlign: "center" }}>
              Não tem conta? Cadastre-se
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    </Screen>
  );
}
