import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import Card from "../components/Card";
import { AuthContext } from "../context/AuthContext";
import { colors, spacing } from "../styles/theme";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [tab, setTab] = useState("teacher"); // teacher | student
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      if (tab === "student") {
        await login(email, null, "student");
      } else {
        if (!password) {
          Alert.alert("Atenção", "Informe a senha");
          return;
        }
        await login(email, password, "teacher");
      }
    } catch (err) {
      Alert.alert(
        "Erro",
        err.response?.data?.error || "Falha no login"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: spacing.md }}>
          Login
        </Text>

        {/* Abas */}
        <View style={{ flexDirection: "row", marginBottom: spacing.md }}>
          {[
            { key: "teacher", label: "Professor / Admin" },
            { key: "student", label: "Sou Aluno" },
          ].map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTab(t.key)}
              style={{
                flex: 1,
                padding: 10,
                backgroundColor: tab === t.key ? colors.primary : "#eee",
              }}
            >
              <Text style={{ textAlign: "center", color: tab === t.key ? "#fff" : "#000" }}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, padding: 8, marginBottom: spacing.sm }}
        />

        {tab === "teacher" && (
          <>
            <Text>Senha</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{ borderWidth: 1, padding: 8, marginBottom: spacing.sm }}
            />
          </>
        )}

        <Button
          title={loading ? "Entrando..." : "Entrar"}
          onPress={handleLogin}
        />

        {tab !== "student" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: spacing.md }}
          >
            <Text
              style={{
                textAlign: "center",
                color: colors.primary,
                fontWeight: "600",
              }}
            >
              Criar conta (Professor / Admin)
            </Text>
          </TouchableOpacity>
        )}

      </Card>
    </Screen>
  );
}
